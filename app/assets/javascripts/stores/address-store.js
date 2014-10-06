//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
//= require stores/session-store
//= require stores/user-store

var AddressStore = (function () {
  var _addresses = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  var ActionTypes = BloomingConstants.ActionTypes;

  return {
    addresses: function() {
      return _addresses;
    },

    getUserAddresses: function (id) {
      $.ajax({
        url: '/users/' + id + '/addresses',
        type: 'GET'
      })
      .done(function (data) {
        _addresses = data.addresses;
        this.triggerChange();
      }.bind(this))
    },

    setAddresses: function(data) {
      _addresses = data;
    },

    new: function () {
      return {
        id: null,
        street_address: null,
        apartment_number: null,
        city: null,
        state: null,
        zipcode: null,
        delivery_instructions: null,
      };
    },

    addChangeEvent: function (callback) {
      $(this).on(CHANGE_EVENT, callback);
    },
    addFailToTakeAction: function (callback) {
      $(this).on(FAIL_TO_CREATE_EVENT, callback);
    },
    triggerChange: function (data) {
      $(this).trigger(CHANGE_EVENT, data);
    },
    addFailToTakeAction: function(callback) {
      $(this).on(FAIL_TO_CREATE_EVENT, callback);
    },
    triggerFailToTakeAction: function(data) {
      $(this).trigger(FAIL_TO_CREATE_EVENT, data);
    },
    create: function(data) {
      var authenticityToken = SessionStore.getAuthenticityToken();
      $.ajax({
        url: '/users/' + data.userId + '/addresses',
        type: 'POST',
        data: { address: data, authenticity_token: authenticityToken }
      })
      .done(function (data) {
        _addresses.push(data.address);
        UserStore.addPropertyToUser('addresses', data.address);
        this.triggerChange();
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    update: function (data) {
      var authenticityToken = SessionStore.getAuthenticityToken();
      $.ajax({
        url: '/users/' + data.userId + '/addresses/' + data.id,
        type: 'PUT',
        data: {address: data, authenticity_token: authenticityToken}
      })
      .done(function (data) {
        _addresses.forEach(function (addr, i) {
          if (addr.id === data.address.id) {
            _addresses[i] = data.address;
            return this.triggerChange();
          }
        }.bind(this))
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    delete: function (data) {
      var authenticityToken = SessionStore.getAuthenticityToken();
      $.ajax({
        type: 'DELETE',
        url: '/users/' + data.userId + '/addresses/' + data.id,
        data: { authenticity_token: authenticityToken }
      })
      .done(function (data) {
        _addresses.forEach(function (addr, i) {
          if (addr.id === data.id) {
            addrToRemove = _addresses.splice(i, 1)[0];
            UserStore.removePropertyFromUser('addresses', addrToRemove);
            return this.triggerChange();
          }
        }.bind(this));
      }.bind(this))
      .fail(function (xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this));
    },

    payload: function (payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CREATE_ADDRESS:
          this.create(action.data);
          break;
        case ActionTypes.UPDATE_ADDRESS:
          this.update(action.data);
          break;
        case ActionTypes.DESTROY_ADDRESS:
          this.delete(action.data);
          break;
        default:
      }
    }
  }
}());

BloomingDispatcher.register(AddressStore.payload.bind(AddressStore));

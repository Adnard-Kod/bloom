//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
//= require stores/session-store

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

    create: function(user_id, address) {
      var authenticityToken = SessionStore.getAuthenticityToken();
      $.ajax({
        url: '/users/' + user_id + '/addresses',
        type: 'POST',
        data: { address: address, authenticity_token: authenticityToken }
      })
      .done(function (data) {
        debugger;
        _addresses.push(data.address);
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

    delete: function (id) {
      var authenticityToken = SessionStore.getAuthenticityToken();
      $.ajax({
        type: 'DELETE',
        url: '/users/current_user/addresses',
        data: {id: id, authenticity_token: authenticityToken}
      })
      .done(function (data) {
        _addresses.forEach(function (addr, i) {
          if (addr.id === data.id) {
            _addresses.splice(i, 1);
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
          this.delete(action.id);
          break;
        default:
      }
    }
  }
}());

BloomingDispatcher.register(AddressStore.payload.bind(AddressStore));

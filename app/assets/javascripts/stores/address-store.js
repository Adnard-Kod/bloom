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

    create: function(address) {
      var authenticityToken = SessionStore.getAuthenticityToken();
      $.ajax({
        url: '/users/current_user/addresses',
        type: 'POST',
        data: { address: address, authenticity_token: authenticityToken }
      })
      .done(function (data) {
        _addresses.push(data.address);
        this.triggerChange();
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
        default:
      }
    }
  }
}());

BloomingDispatcher.register(AddressStore.payload.bind(AddressStore));

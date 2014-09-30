//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher

var UserStore = (function () {
  var _user = {};
  var CHANGE_EVENT = 'change';
  var ActionTypes = BloomingConstants.ActionTypes;

  return {
    currentUser: function() {
      return _user;
    },
    new: function() {
      return {
        email: null,
        first_name: null,
        last_name: null,
        phone_number: null,
        password: null,
        password_confirmation: null
      }
    },
    create: function (userData) {

      $.ajax({
        type: 'POST',
        url: '/users',
        data: {user: userData}
      })
      .done(function(data) {
        window.location = data.redirect;
      })
      .fail(function (xhr, status, selse) {
        $(this).trigger('creation-error', JSON.parse(xhr.responseText));
      }.bind(this));
    },

    getCurrentUserInfo: function(userId) {
      $.ajax({
        type: 'GET',
        url: '/users/' + userId
      })
      .done(function(data) {
        _user = data.user;
        this.triggerChange();
      }.bind(this))
    },

    payload: function(payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CREATE_USER:
          this.create(action.data);
          break;
        default:
          // do nothing
      }
    }
  }
}());
BloomingDispatcher.register(UserStore.payload.bind(UserStore));

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

    addPropertyToUser: function(key, properties) {
      if(key in _user) {
        _user[key] = [properties];
        this.triggerChange();
      }
    },

    removePropertyFromUser: function(key, properties) {
      if (key in _user) {
        _user[key].forEach(function(addr, index) {
          if (addr.id === properties.id) {
            _user[key].splice(index, 1);
            this.triggerChange();
          }
        }.bind(this))
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

    addChangeEvent: function(callback) {
      $(this).on(CHANGE_EVENT, callback);
    },
    triggerChange: function(data) {
      $(this).trigger(CHANGE_EVENT, data);
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

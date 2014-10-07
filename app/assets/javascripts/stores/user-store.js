//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher

var UserStore = (function () {
  var _user = {};
  var _users = [];
  var CHANGE_EVENT = 'change';
  var ActionTypes = BloomingConstants.ActionTypes;

  return {
    currentUser: function() {
      return _user;
    },
    setCurrentUser: function(user) {
      _user = user;
      this.triggerChange();
    },
    users: function() {
      return _users;
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
    updatePropertyOnUser: function(key, properties) {
      if(key in _user && _user[key][0].id === properties.id) {
        _user[key] = [properties];
        this.triggerChange();
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
    all: function(add_on_id) {
      $.ajax({
        url: '/admin/users',
        type: 'GET',
      })
      .done(function(data) {
        _users = data.users;
        this.triggerChange();
      }.bind(this))
    },
    destroy: function(id) {
      $.ajax({
        url: '/admin/users/'+id,
        type: 'DELETE',
        data: {id: id}
      })
      .done(function(data) {
        _users.forEach(function(user, i) {
          if (user.id === data.id) {
            _users.splice(i, 1);
            return this.triggerChange();
          }
        }.bind(this))
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    update: function(user) {
      $.ajax({
        url: '/admin/users/'+ user.id,
        type: 'PUT',
        data: {user: user}
      })
     .done(function(data) {
       _users.forEach(function(user, i) {
         if(user.id === data.user.id) {
           _users[i]['admin'] = data.user.admin;
           return this.triggerChange();
         }
       }.bind(this))
     }.bind(this))
     .fail(function(xhr) {
       this.triggerFailToTakeAction([xhr.responseJSON.errors]);
     }.bind(this))
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
        case ActionTypes.DESTROY_USER:
          this.destroy(action.id)
          break;
        case ActionTypes.UPDATE_USER:
          this.update(action.data)
          break;
        default:
          // do nothing
      }
    }
  }
}());
BloomingDispatcher.register(UserStore.payload.bind(UserStore));

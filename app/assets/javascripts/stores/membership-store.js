//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
//= require stores/session-store
//= require stores/user-store

var MembershipStore = (function() {
  var _memberships = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  var ActionTypes = BloomingConstants.ActionTypes;

  return {
    memberships: function() {
      return _memberships;
    },

    getUserMemberships: function() {
      $.ajax({
        type: 'GET',
        url: '/user/memberships',
        data: { user_id: SessionStore.currentUser }
      })
      .done(function(data) {
        _memberships = data.memberships;
        this.triggerChange();
      }.bind(this));
    },

    getUserMembershipsAdmin: function() {
      $.ajax({
        type: 'GET',
        url: '/admin/memberships'
      })
      .done(function(data) {
        _memberships = data;
        this.triggerChange();
      }.bind(this));
    },

    addChangeEvent: function(callback) {
      $(this).on(CHANGE_EVENT, callback);
    },
    removeChangeEvent: function(obj) {
      $(this).off(CHANGE_EVENT, obj);
    },
    addFailToTakeAction: function(callback) {
      $(this).on(FAIL_TO_CREATE_EVENT, callback);
    },
    removeFailToTakeAction: function(obj) {
      $(this).off(FAIL_TO_CREATE_EVENT, obj);
    },
    triggerFailToTakeAction: function(data) {
      $(this).trigger(FAIL_TO_CREATE_EVENT, data);
    },
    triggerChange: function(data) {
      $(this).trigger(CHANGE_EVENT, data);
    },

    update: function(data) {
      $.ajax({
        type: 'PUT',
        url: '/user/memberships/' + data.membershipId,
        data: { user_id: data.userId, status: data.status }
      })
      .done(function(data) {
        UserStore.removePropertyFromUser('active_memberships', data.membership);
        UserStore.addPropertyToUser('on_hold_memberships', data.membership);
      });
    },

    payload: function(payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.UPDATE_MEMBERSHIP:
          this.update(action.data);
          break;
        default:
          // do nothing
      }
    }
  }
}());

BloomingDispatcher.register(MembershipStore.payload.bind(MembershipStore))

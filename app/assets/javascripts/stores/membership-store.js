//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
//= require stores/session-store
//= require stores/user-store

var MembershipStore = (function() {
  var _memberships = [];
  var _membershipHoldDateInfo = {}
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  var ActionTypes = BloomingConstants.ActionTypes;

  return {
    memberships: function() {
      return _memberships;
    },

    membershipHoldDateInfo: function() {
      return _membershipHoldDateInfo;
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

    getHoldStartDateOptions: function(id) {
      $.ajax({
        type: 'GET',
        url: '/user/memberships/' + id + '/hold_start_date_options'
      })
      .done(function(data) {
        _membershipHoldDateInfo = data;
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

    changeStatus: function(data) {
      var previousStatus = data.status;
      this.update(data, function(response) {
        UserStore.removePropertyFromUser(previousStatus + '_memberships', response.membership);
        UserStore.addPropertyToUser(response.membership.status + '_memberships', response.membership);
      });
    },

    update: function(data, callback) {
      $.ajax({
        type: 'PUT',
        url: '/user/memberships/' + data.membershipId,
        data: { user_id: data.userId, status: data.status }
      })
      .done(callback);
    },

    payload: function(payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CHANGE_MEMBERSHIP_STATUS:
          this.changeStatus(action.data);
          break;
        default:
          // do nothing
      }
    }
  }
}());

BloomingDispatcher.register(MembershipStore.payload.bind(MembershipStore))

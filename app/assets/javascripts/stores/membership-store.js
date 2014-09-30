//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
//= require stores/session-store

var MembershipStore = (function() {
  var _memberships = [];
  var CHANGE_EVENT = 'change';

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
        debugger
      });
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
        default:
      }
    }
  }
}());

BloomingDispatcher.register(MembershipStore.payload.bind(MembershipStore))

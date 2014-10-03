//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants

var MembershipActions = {
  changeMembership: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CHANGE_MEMBERSHIP_STATUS,
      data: data
    });
  }
}

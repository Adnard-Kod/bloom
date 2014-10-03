//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants

var MembershipActions = {
  updateMembership: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.UPDATE_MEMBERSHIP,
      data: data
    });
  }
}

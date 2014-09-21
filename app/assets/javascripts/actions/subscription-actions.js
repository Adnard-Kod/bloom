//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants
var SubscriptionActions = {
  createSubscription: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_SUBSCRIPTION,
      data: data
    });
  },
  updateSubscription: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.UPDATE_SUBSCRIPTION,
      data: data
    });
  },
  destroySubscription: function(id) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.DESTROY_SUBSCRIPTION,
      id: id
    });
  }
}

//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants
var SessionActions = {
  createSession: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_SESSION,
      data: data
    });
  },
  destroySession: function() {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.DESTROY_SESSION
    });
  }
}

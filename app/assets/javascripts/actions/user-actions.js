//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants
var UserActions = {
  createUser: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_USER,
      data: data
    });
  }
}

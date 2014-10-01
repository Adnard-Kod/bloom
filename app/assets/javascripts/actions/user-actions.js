//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants
var UserActions = {
  createUser: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_USER,
      data: data
    });
  },
  destroyUser: function(id) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.DESTROY_USER,
      id: id
    });
  },
  updateUser: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.UPDATE_USER,
      data: data
    });
  }
}

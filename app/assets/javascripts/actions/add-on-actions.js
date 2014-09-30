//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants

var AddOnActions = {
  createAddOn: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_ADD_ON,
      data: data
    });
  },
  updateAddOn: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.UPDATE_ADD_ON,
      data: data
    });
  },
  destroyAddOn: function(id) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.DESTROY_ADD_ON,
      id: id
    });
  }
}

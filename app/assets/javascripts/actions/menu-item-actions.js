//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants
var MenuItemActions = {
  createMenuItem: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_MENU_ITEM,
      data: data
    });
  },
  updateMenuItem: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.UPDATE_MENU_ITEM,
      data: data
    });
  },
  destroyMenuItem: function(id) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.DESTROY_MENU_ITEM,
      id: id
    });
  }
}

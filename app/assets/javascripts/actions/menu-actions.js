//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants
var MenuActions = {
  createMenu: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_MENU,
      data: data
    });
  },
  updateMenu: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.UPDATE_MENU,
      data: data
    });
  },
  currentMenu: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CURRENT_MENU,
      data: data
    });
  },
  destroyMenu: function(id) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.DESTROY_MENU,
      id: id
    });
  },
  additem: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.ADD_ITEM,
      data: data
    });
  }
}

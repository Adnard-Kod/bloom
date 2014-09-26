//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants
var SelectedItemActions = {
  createSelectedItem: function(menu_id, data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_SELECTED_ITEM,
      data: data,
      menu_id: menu_id
    });
  },
  destroySelectedItem: function(menu_id, id) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.DESTROY_SELECTED_ITEM,
      id: id,
      menu_id: menu_id
    });
  },
  makeDefault: function(menu_id, id) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.SELECTED_ITEM_DEFAULT,
      id: id,
      menu_id: menu_id
    });
  }
}

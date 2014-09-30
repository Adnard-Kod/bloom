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
  },
  removeDefault: function(menu_id, id) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.SELECTED_ITEM_REMOVE_DEFAULT,
      id: id,
      menu_id: menu_id
    });
  },
  userSelect: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.USER_SELECT_ITEM,
      data: data
    });
  },
  userDeselect: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.USER_DESELECT_ITEM,
      data: data
    });
  },
  saveUserSelectedItems: function() {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.SAVE_USER_SELECTED_ITEMS
    });
  }
}

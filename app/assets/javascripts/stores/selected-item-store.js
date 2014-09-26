//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
var SelectedItemStore = (function() {
  var _selectedItems = {};
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  var ActionTypes = BloomingConstants.ActionTypes;
  return {
    selectedItems: function(id) {
      return _selectedItems[id] || [];
    },
    menuItems: function(id) {
      return this.selectedItems(id).map(function(item) {
        return item.menu_item
      })
    },
    all: function(menu_id) {
      $.ajax({
        url: '/admin/menus/'+menu_id+'/selected_items',
        type: 'GET'
      })
      .done(function(data) {
        _selectedItems[menu_id] = data.selected_items;
        this.triggerChange();
      }.bind(this))
    },
    addChangeEvent: function(callback) {
      $(this).on(CHANGE_EVENT, callback);
    },
    removeChangeEvent: function(obj) {
      $(this).off(CHANGE_EVENT, obj);
    },
    addFailToTakeAction: function(callback) {
      $(this).on(FAIL_TO_CREATE_EVENT, callback);
    },
    removeFailToTakeAction: function(obj) {
      $(this).off(FAIL_TO_CREATE_EVENT, obj);
    },
    triggerFailToTakeAction: function(data) {
      $(this).trigger(FAIL_TO_CREATE_EVENT, data);
    },
    triggerChange: function(data) {
      $(this).trigger(CHANGE_EVENT, data);
    },
    create: function(menu_id, menuItemId) {
      $.ajax({
        url: '/admin/menus/'+menu_id+'/selected_items',
        type: 'POST',
        data: {menu_item_id: menuItemId}
      })
      .done(function(data) {
        _selectedItems[menu_id].push(data.selected_item)
        this.triggerChange();
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    destroy: function(menu_id, id) {
      $.ajax({
        url: '/admin/menus/'+menu_id+'/selected_items/'+id,
        type: 'DELETE'
      })
      .done(function(data) {
        _selectedItems[menu_id].forEach(function(selectedItem, i) {
          if (selectedItem.id === data.selected_item.id) {
            _selectedItems[menu_id].splice(i, 1);
            return this.triggerChange();
          }
        }.bind(this))
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    update: function(menu_id, id, data) {
      $.ajax({
        url: '/admin/menus/'+menu_id+'/selected_items/'+id,
        type: 'PUT',
        data: {selected_item: data}
      })
      .done(function(data) {
        _selectedItems[menu_id].forEach(function(selectedItem, i) {
          if (selectedItem.id === data.selected_item.id) {
            _selectedItems[menu_id][i] = data.selected_item;
            return this.triggerChange();
          }
        }.bind(this))
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    makeDefault: function(menu_id, id) {
      this.update(menu_id, id, {default: true});
    },
    removeDefault: function(menu_id, id) {
      this.update(menu_id, id, {default: false});
    },

    payload: function(payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CREATE_SELECTED_ITEM:
          this.create(action.menu_id, action.data);
          break;
        case ActionTypes.DESTROY_SELECTED_ITEM:
          this.destroy(action.menu_id, action.id);
          break;
        case ActionTypes.SELECTED_ITEM_DEFAULT:
          this.makeDefault(action.menu_id, action.id);
          break;
        case ActionTypes.SELECTED_ITEM_REMOVE_DEFAULT:
          this.removeDefault(action.menu_id, action.id);
          break;
        default:
          // do nothing
      }
    }
  }
}())

BloomingDispatcher.register(SelectedItemStore.payload.bind(SelectedItemStore));

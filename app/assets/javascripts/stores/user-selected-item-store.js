//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
var UserSelectedItemStore = (function() {
  var _selectedItems = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  var ActionTypes = BloomingConstants.ActionTypes;
  return {
    selectedItems: function() {
      return _selectedItems;
    },
    selectedMenuItems: function() {
      var items = {};
      this.selectedItems().forEach(function(item){ items[item.menu_item.id] = item.quantity});
      return items;
    },
    selectedItemsCount: function() {
      var count = 0;
      _selectedItems.forEach(function(item) {count += item.quantity});
      return count;
    },
    setSelectedItems: function(data, message) {
      _selectedItems = data;
      this.triggerChange(message);
    },
    appendToSelectedItems: function(data) {
      previouslySelected = _selectedItems.filter(function(item) {
        return item.menu_item.id === data.menu_item.id
      })[0]
      if(previouslySelected) {
        previouslySelected.quantity += 1;
      } else {
        data.quantity = 1;
        _selectedItems.push(data);
      }

      this.triggerChange();
    },
    removeFromSelectedItems: function(data) {
      _selectedItems.forEach(function(selectedItem, i) {
        if (selectedItem.menu_item.id === data.menu_item.id) {
          if (selectedItem.quantity === 1) {
            _selectedItems.splice(i, 1);
          } else {
            selectedItem.quantity -= 1;
          }
          return this.triggerChange();
        }
      }.bind(this));
    },
    menuItems: function(id) {
      return this.selectedItems(id).map(function(item) {
        return item.menu_item
      })
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
        url: '/user/menus/'+menu_id+'/selected_items',
        type: 'POST',
        data: {menu_item_id: menuItemId}
      })
      .done(function(data) {
        _selectedItems[menu_id].push(data.menu_selected_item)
        this.triggerChange();
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    destroy: function(menu_id, id) {
      $.ajax({
        url: '/user/menus/'+menu_id+'/selected_items/'+id,
        type: 'DELETE'
      })
      .done(function(data) {
        _selectedItems[menu_id].forEach(function(selectedItem, i) {
          if (selectedItem.id === data.menu_selected_item.id) {
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
          if (selectedItem.id === data.menu_selected_item.id) {
            _selectedItems[menu_id][i] = data.menu_selected_item;
            return this.triggerChange();
          }
        }.bind(this))
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    weeklyItems: function() {
      $.ajax({
        url: '/admin/weekly_orders',
        type: 'GET',
      })
      .done(function(data) {
        _selectedItems = data
        this.triggerChange();
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    saveUserSelectedItems: function() {
      $.ajax({
        url: '/user/selected_items',
        type: 'POST',
        data: {authenticity_token: SessionStore.getAuthenticityToken(), selected_items: this.selectedMenuItems()}
      })
      .done(function(data) {
        this.setSelectedItems(data.selected_items, 'Item Saved!')
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    payload: function(payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CREATE_USER_SELECTED_ITEM:
          this.create(action.menu_id, action.data);
          break;
        case ActionTypes.DESTROY_USER_SELECTED_ITEM:
          this.destroy(action.menu_id, action.id);
          break;
        case ActionTypes.USER_SELECT_ITEM:
          this.appendToSelectedItems(action.data);
          break;
        case ActionTypes.USER_DESELECT_ITEM:
          this.removeFromSelectedItems(action.data);
          break;
        case ActionTypes.SAVE_USER_SELECTED_ITEMS:
          this.saveUserSelectedItems();
          break;
        default:
          // do nothing
      }
    }
  }
}())

BloomingDispatcher.register(UserSelectedItemStore.payload.bind(UserSelectedItemStore));

//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
var MenuItemStore = (function() {
  var _menuItems = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  var CATEGORIES = ['Entre', 'Sidedish']
  var ActionTypes = BloomingConstants.ActionTypes;
  return {
    categories: CATEGORIES,
    menuItems: function() {
      return _menuItems;
    },
    new: function() {
      return {
        id: null,
        name: null,
        description: null,
        category: null
      }
    },

    all: function(menu_id) {
      $.ajax({
        url: '/admin/menu_items',
        type: 'GET',
        data: {menu_id: menu_id}
      })
      .done(function(data) {
        _menuItems = data.menu_items;
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
    create: function(menuItem) {
      $.ajax({
        url: '/admin/menu_items',
        type: 'POST',
        data: {menu_item: menuItem}
      })
      .done(function(data) {
        _menuItems.unshift(data.menu_item)
        this.triggerChange();
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    update: function(menuItem) {
      $.ajax({
        url: '/admin/menu_items/' + menuItem.id,
        type: 'PUT',
        data: {menu_item: menuItem}
      })
      .done(function(data) {
        _menuItems.forEach(function(menuItem, i) {
          if(menuItem.id === data.menu_item.id) {
            _menuItems[i] = data.menu_item;
            return this.triggerChange();
          }
        }.bind(this))
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    destroy: function(id) {
      $.ajax({
        url: '/admin/menu_items/'+id,
        type: 'DELETE',
        data: {id: id}
      })
      .done(function(data) {
        _menuItems.forEach(function(menuItem, i) {
          if (menuItem.id === data.id) {
            _menuItems.splice(i, 1);
            return this.triggerChange();
          }
        }.bind(this))
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    payload: function(payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CREATE_MENU_ITEM:
          this.create(action.data);
          break;
        case ActionTypes.UPDATE_MENU_ITEM:
          this.update(action.data);
          break;
        case ActionTypes.DESTROY_MENU_ITEM:
          this.destroy(action.id);
          break;
        default:
          // do nothing
      }
    }
  }
}())

BloomingDispatcher.register(MenuItemStore.payload.bind(MenuItemStore));

//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
var MenuItemStore = (function() {
  var _menuItems = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  var ActionTypes = BloomingConstants.ActionTypes;
  return {
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

    all: function() {
      $.ajax({
        url: '/admin/menu_items',
        type: 'GET'
      })
      .done(function(data) {
        _menuItems = data.menuItems;
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
    create: function(menu) {
      $.ajax({
        url: '/admin/menus',
        type: 'POST',
        data: {menu: menu}
      })
      .done(function(data) {
        _menus.push(data.menu)
        this.triggerChange();
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    update: function(menu) {
      $.ajax({
        url: '/admin/menus/' + menu.id,
        type: 'PUT',
        data: {menu: menu}
      })
      .done(function(data) {
        _menus.forEach(function(menu, i) {
          if(menu.id === data.menu.id) {
            _menus[i] = data.menu;
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
        url: '/admin/menus/'+id,
        type: 'DELETE',
        data: {id: id}
      })
      .done(function(data) {
        _menus.forEach(function(menu, i) {
          if (menu.id === data.id) {
            _menus.splice(i, 1);
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
        case ActionTypes.CREATE_MENU:
          this.create(action.data);
          break;
        case ActionTypes.UPDATE_MENU:
          this.update(action.data);
          break;
        case ActionTypes.DESTROY_MENU:
          this.destroy(action.id);
          break;
        default:
          // do nothing
      }
    }
  }
}())

BloomingDispatcher.register(MenuStore.payload.bind(MenuStore));

//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
var MenuStore = (function() {
  var _menus = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  var ActionTypes = BloomingConstants.ActionTypes;
  return {
    menus: function() {
      return _menus;
    },
    currentMenu: function() {
      return _menus.filter(function(menu) {
        return menu.current;
      })[0]
    },
    new: function() {
      return {
        id: null,
        title: null
      }
    },

    all: function() {
      $.ajax({
        url: '/admin/menus',
        type: 'GET'
      })
      .done(function(data) {
        _menus = data.menus;
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
        _menus.unshift(data.menu)
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
            // if we set this item to be the current menu, then remove the old current.
            if(data.menu.current) this.removeCurrent();
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
    addItem: function(data) {
      $.ajax({
        url: '/admin/menus/'+data.id+'/add_item',
        type: 'POST',
        data: {item_id: data.item}
      })
      .done(function(data) {
        this.triggerChange(data);
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    removeCurrent: function() {
      var indexOfCurrent = _menus.indexOf(this.currentMenu());
      if(_menus[indexOfCurrent]) _menus[indexOfCurrent].current = false;
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
        case ActionTypes.CURRENT_MENU:
          this.update(action.data);
          break;
        case ActionTypes.DESTROY_MENU:
          this.destroy(action.id);
          break;
        case ActionTypes.ADD_ITEM:
          this.addItem(action.data);
          break;
        default:
          // do nothing
      }
    }
  }
}())

BloomingDispatcher.register(MenuStore.payload.bind(MenuStore));

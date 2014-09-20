var MenuStore = (function() {
  var _menus = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  return {
    menus: function() {
      return _menus;
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
    submit: function(data) {
      data.editing ? this.edit(data.menu) : this.create(data.menu);
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
    edit: function(menu) {
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
    }
  }
}())

var MenuStore = (function() {
  var _menus = [];
  var CHANGE_EVENT = 'change';

  return {
    menus: function() {
      return _menus;
    },
    all: function() {
      $.ajax({
        url: '/menus',
        type: 'GET'
      })
      .done(function(data) {
        _menus = data;
        this.triggerChange();
      }.bind(this))
    },
    addChangeEvent: function(callback) {
      $(this).on(CHANGE_EVENT, callback);
    },
    triggerChange: function(data) {
      $(this).trigger(CHANGE_EVENT, data);
    }
  }
}())

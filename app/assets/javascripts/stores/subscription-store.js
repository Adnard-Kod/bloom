var SubscriptionStore = (function() {
  var _subscriptions = [];
  var CHANGE_EVENT = 'change';
  return {
    subscriptions: function() {
      return _subscriptions;
    },
    all: function() {
      $.ajax({
        url: '/subscriptions',
        type: 'GET'
      })
      .done(function(data) {
        _subscriptions = data.subscriptions;
        this.triggerChange();
      }.bind(this));
    },
    addChangeEvent: function(callback) {
      $(this).on(CHANGE_EVENT, callback);
    },
    triggerChange: function() {
      $(this).trigger(CHANGE_EVENT);
    },
    create: function(data) {
      $.ajax({
        url: '/admin/subscriptions',
        type: 'POST',
        data: {subscription: data}
      }).done(function(data) {
        _subscriptions.unshift(data.subscription)
        this.triggerChange();
      }.bind(this))
    }
  }
}())

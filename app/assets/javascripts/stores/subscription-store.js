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
      })
    },
    addChangeEvent: function(callback) {
      $(this).on(CHANGE_EVENT, callback);
    }
  }
}())

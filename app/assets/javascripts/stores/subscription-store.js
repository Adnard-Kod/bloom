var SubscriptionStore = (function() {
  var _subscriptions = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
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
    addFailToCreateEvent: function(callback) {
      $(this).on(FAIL_TO_CREATE_EVENT, callback);
    },
    triggerFailToCreate: function(data) {
      $(this).trigger(FAIL_TO_CREATE_EVENT, data);
    },
    triggerChange: function(data) {
      $(this).trigger(CHANGE_EVENT, data);
    },
    submit: function(data) {
      data.editing ? this.edit(data.subscription) : this.create(data.subscription);
    },
    create: function(subscription) {
      $.ajax({
        url: '/admin/subscriptions',
        type: 'POST',
        data: {subscription: subscription}
      })
      .done(function(data) {
        _subscriptions.push(data.subscription)
        this.triggerChange();
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToCreate([xhr.responseJSON.errors]);
      }.bind(this))
    },
    edit: function(subscription) {
      $.ajax({
        url: '/admin/subscriptions/'+subscription.id,
        type: 'PUT',
        data: {subscription: subscription}
      })
      .done(function(data) {
        _subscriptions.forEach(function(sub, i) {
          if(sub.id === data.subscription.id) {
            _subscriptions[i] = data.subscription;
            return this.triggerChange();
          }
       }.bind(this))
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToCreate([xhr.responseJSON.errors]);
      }.bind(this))
    }
  }
}())

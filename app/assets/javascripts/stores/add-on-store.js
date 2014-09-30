//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher

var AddOnStore = (function() {
  var _addOns = [];
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  var ActionTypes = BloomingConstants.ActionTypes;
  return {
    addOns: function() {
      return _addOns;
    },
    new: function() {
      return {
        id: null,
        name: null,
        description: null,
        price: null
      }
    },
    all: function(add_on_id) {
      $.ajax({
        url: '/admin/add_ons',
        type: 'GET',
        data: {add_on_id: add_on_id}
      })
      .done(function(data) {
        _addOns = data.add_ons;
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
    create: function(addOn) {
      $.ajax({
        url: '/admin/add_ons',
        type: 'POST',
        data: {add_on: addOn}
      })
      .done(function(data) {
        _addOns.unshift(data.add_on)
        this.triggerChange();
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    update: function(addOn) {
      $.ajax({
        url: '/admin/add_ons/' + addOn.id,
        type: 'PUT',
        data: {add_on: addOn}
      })
      .done(function(data) {
        _addOns.forEach(function(addOn, i) {
          if(addOn.id === data.add_on.id) {
            _addOns[i] = data.add_on;
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
        url: '/admin/add_ons/'+id,
        type: 'DELETE',
        data: {id: id}
      })
      .done(function(data) {
        _addOns.forEach(function(addOn, i) {
          if (addOn.id === data.id) {
            _addOns.splice(i, 1);
            return this.triggerChange();
          }
        }.bind(this))
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    active: function(id) {
      $.ajax({
        url: '/admin/add_ons/active',
        type: 'GET'
      })
      .done(function(data) {

        _addOns = data.add_ons;
        this.triggerChange();
      }.bind(this))
    },

    payload: function(payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CREATE_ADD_ON:
          this.create(action.data);
          break;
        case ActionTypes.UPDATE_ADD_ON:
          this.update(action.data);
          break;
        case ActionTypes.DESTROY_ADD_ON:
          this.destroy(action.id);
          break;
        default:
          // do nothing
      }
    }
  }
}())

BloomingDispatcher.register(AddOnStore.payload.bind(AddOnStore));

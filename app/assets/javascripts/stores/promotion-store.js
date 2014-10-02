//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
var PromotionStore = (function() {
  var _promotions = [];
  var _current_discount = {};
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  var DISCOUNT_TYPES = ["$", "%"]
  var ActionTypes = BloomingConstants.ActionTypes;
  return {
    discountTypes: DISCOUNT_TYPES,
    promotions: function() {
      return _promotions;
    },
    currentDiscount: function() {
      return _current_discount;
    },
    new: function() {
      return {
        id: null,
        code: null,
        description: null,
        discount_type: null,
        discount_amount: null
      }
    },
    all: function() {
      $.ajax({
        url: '/promotions',
        type: 'GET'
      })
      .done(function(data) {
        _promotions = data.promotions;
        this.triggerChange();
      }.bind(this));
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
    create: function(promotion) {
      $.ajax({
        url: '/admin/promotions',
        type: 'POST',
        data: {promotion: promotion}
      })
      .done(function(data) {
        _promotions.unshift(data.promotion)
        this.triggerChange();
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    update: function(promotion) {
      $.ajax({
        url: '/admin/promotions/'+promotion.id,
        type: 'PUT',
        data: {promotion: promotion}
      })
      .done(function(data) {
        _promotions.forEach(function(sub, i) {
          if(sub.id === data.promotion.id) {
            _promotions[i] = data.promotion;
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
        url: '/admin/promotions/'+id,
        type: 'DELETE',
        data: {id: id}
      })
      .done(function(data) {
        _promotions.forEach(function(sub, i) {
          if(sub.id === data.id) {
            _promotions.splice(i, 1);
            return this.triggerChange();
          }
       }.bind(this))
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    validatePromotionCode: function(data){
      $.ajax({
        type: 'GET',
        url: '/promotions/validate_promotion_code',
        data: { promo_code: data }
      })
      .done(function(data){
        _current_discount = data.promotion;
      })
      .fail(function(xhr){

      })
    },
    payload: function(payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CREATE_PROMOTION:
          this.create(action.data);
          break;
        case ActionTypes.UPDATE_PROMOTION:
          this.update(action.data);
          break;
        case ActionTypes.DESTROY_PROMOTION:
          this.destroy(action.id);
          break;
        case ActionTypes.VALIDATE_PROMOTION_CODE:
          this.validatePromotionCode(action.data);
        default:
          // do nothing
      }
    }
  }
}())

BloomingDispatcher.register(PromotionStore.payload.bind(PromotionStore));

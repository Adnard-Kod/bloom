//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants
var PromotionActions = {
  createPromotion: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_PROMOTION,
      data: data
    });
  },
  updatePromotion: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.UPDATE_PROMOTION,
      data: data
    });
  },
  destroyPromotion: function(id) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.DESTROY_PROMOTION,
      id: id
    });
  },
  validatePromotionCode: function(data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.VALIDATE_PROMOTION_CODE,
      data: data
    })
  }
}

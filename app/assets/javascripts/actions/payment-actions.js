//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants

var PaymentActions = {
  createPaymentForm: function () {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_PAYMENT_FORM
    });
  }
}

//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
//= require stores/session-store
//= require checkout

var PaymentStore = (function () {
  var ActionTypes = BloomingConstants.ActionTypes;
  var paymentInfo = {
    name: 'Blooming Spoon',
    description: '2 widgets ($20.00)',
    amount: 2000
  };

  var handler = StripeCheckout.configure({
    key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
    image: '/assets/culinary/01_Blooming_Spoon_Logo_Final.png',
    token: function(token) {
      PaymentStore.authorizePayment(token, paymentInfo);
    }
  });

  return {
    authorizePayment: function (token, paymentInfo) {
      var authenticityToken = SessionStore.getAuthenticityToken();
        $.ajax({
          type: 'POST',
          url: '/user/payments',
          data: { token: token, authenticity_token: authenticityToken, payment_info: paymentInfo }
        })
        .done(function (data) {
        })
        .fail(function (xhr) {
        })
    },

    createPaymentForm: function () {
        handler.open(paymentInfo);
    },

    payload: function (payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CREATE_PAYMENT_FORM:
          this.createPaymentForm();
          break;
        default:
      }
    }
  };
}());

BloomingDispatcher.register(PaymentStore.payload.bind(PaymentStore))

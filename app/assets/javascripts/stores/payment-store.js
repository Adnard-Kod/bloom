//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
//= require stores/session-store
//= require checkout
//= require stores/user-store

var PaymentStore = (function () {
  var ActionTypes = BloomingConstants.ActionTypes;

  return {
    purchaseMembership: function (token, paymentInfo) {
      var authenticityToken = SessionStore.getAuthenticityToken();
        $.ajax({
          type: 'POST',
          url: '/user/memberships',
          data: { token: token, authenticity_token: authenticityToken, payment_info: paymentInfo }
        })
        .done(function (data) {
          UserStore.addPropertyToUser('active_memberships', data.membership);
        })
        .fail(function (xhr) {
        })
      },
    purchaseAddOn: function (token, paymentInfo) {
      var authenticityToken = SessionStore.getAuthenticityToken();
        $.ajax({
          type: 'POST',
          url: '/user/add_ons',
          data: { token: token, authenticity_token: authenticityToken, payment_info: paymentInfo }
        })
        .done(function (data) {
        })
        .fail(function (xhr) {
        })
    },

    createPaymentForm: function (data) {
      var paymentInfo = {
        name: 'Blooming Spoon',
        description: data.name + ' ($' + data.price + ')',
        amount: data.price * 100,
        subscription: data.name + data.description,
        subId: data.id,
        purchaseType: data.type
      };

      var handler = StripeCheckout.configure({
        key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
        image: '/assets/culinary/01_Blooming_Spoon_Logo_Final.png',
        token: function(token) {
          if (paymentInfo.purchaseType === 'AddOn'){
            this.purchaseAddOn(token, paymentInfo);
          } else if(paymentInfo.purchaseType === ""){
            this.purchaseMembership(token, paymentInfo)
          }
        }.bind(this)
      });
      handler.open(paymentInfo);
    },

    payload: function (payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CREATE_PAYMENT_FORM:
          this.createPaymentForm(action.data);
          break;
        default:
      }
    }
  };
}());

BloomingDispatcher.register(PaymentStore.payload.bind(PaymentStore))

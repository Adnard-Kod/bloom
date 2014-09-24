//= require stores/session-store

var PaymentStore = (function () {
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
          url: '/user/dashboard/charge',
          data: { token: token, authenticity_token: authenticityToken, payment_info: paymentInfo }
        })
        .done(function (data) {
        })
        .fail(function (xhr) {
        })
    },

    paymentListener: function () {
      $('#customButton').on('click', function(e) {
        // Open Checkout with further options
        handler.open(paymentInfo);
        e.preventDefault();
      });
    }
  };
}());

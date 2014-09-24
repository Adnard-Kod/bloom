//= require stores/session-store

var PaymentStore = (function () {
  var handler = StripeCheckout.configure({
    key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
    image: '/assets/culinary/01_Blooming_Spoon_Logo_Final.png',
    token: function(token) {
      PaymentStore.authorizePayment(token);
    }
  });

  return {
    authorizePayment: function (token) {
      var authenticityToken = SessionStore.getAuthenticityToken();
        $.ajax({
          type: 'POST',
          url: '/user/dashboard/charge',
          data: {token: token, authenticity_token: authenticityToken}
        })
        .done(function (data) {
        })
        .fail(function (xhr) {
        })
    },

    paymentListener: function () {
      $('#customButton').on('click', function(e) {
        // Open Checkout with further options
        handler.open({
          name: 'Blooming Spoon',
          description: '2 widgets ($20.00)',
          amount: 2000
        });
        e.preventDefault();
      });
    }
  };
}());

/** @jsx React.DOM */
//= require react
//= require stores/payment-store
//= require actions/payment-actions

var UserPayment = React.createClass({displayName: 'UserPayment',
  render: function() {
    return (
      React.DOM.div(null,
        React.DOM.script({src: "https://checkout.stripe.com/checkout.js"}),
        React.DOM.button({id: "customButton", onClick: this.purchaseForm}, "Purchase")
      )
    );
  },

  purchaseForm: function(e) {
    PaymentActions.createPaymentForm();
    e.preventDefault();
  }

});

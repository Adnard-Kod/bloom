/** @jsx React.DOM */
//= require react
//= require stores/payment-store
//= require actions/payment-actions

var UserPayment = React.createClass({
  render: function() {
    return (
      <div>
        <button id="customButton" onClick={this.purchaseForm}>Purchase</button>
      </div>
    );
  },

  purchaseForm: function(e) {
    PaymentActions.createPaymentForm();
    e.preventDefault();
  }

});

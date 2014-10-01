/**
 * @jsx React.DOM
 */
//= require react
//= require actions/payment-actions
var PurchaseAddOn = React.createClass({

  render: function() {
    return (
      <div>
        <button id="customButton" onClick={this.purchase}>Purchase</button>
      </div>
    );
  },
  purchase: function(e){
    var addOns = this.props.addOn[0]
    e.preventDefault()
    PaymentActions.createPaymentForm(addOns)
  }
});


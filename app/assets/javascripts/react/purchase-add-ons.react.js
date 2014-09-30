/**
 * @jsx React.DOM
 */
//= require react
//= require actions/payment-actions
var PurchaseAddOn = React.createClass({displayName: 'PurchaseAddOn',

  render: function() {
    return (
      React.DOM.div(null,
        React.DOM.button({id: "customButton", onClick: this.purchase}, "Purchase")
      )
    );
  },
  purchase: function(e){
    var addOns = this.props.addOn[0]
    e.preventDefault()
    PaymentActions.createPaymentForm(addOns)
  }
});


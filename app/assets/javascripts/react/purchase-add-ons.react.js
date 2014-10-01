/**
 * @jsx React.DOM
 */
//= require react
//= require actions/payment-actions
var PurchaseAddOn = React.createClass({displayName: 'PurchaseAddOn',

  render: function() {
    return (
      React.DOM.div(null,
        React.DOM.a({className: "col-lg-12 btn btn-success", onClick: this.purchase}, "Purchase Add On")
      )
    );
  },
  purchase: function(e){
    var addOns = this.props.addOn[0]
    e.preventDefault()
    PaymentActions.createPaymentForm(addOns)
  }
});


/**
 * @jsx React.DOM
 */
//= require react
//= require actions/payment-actions
var PurchaseAddOn = React.createClass({

  render: function() {
    return (
      <div>
        <a className='col-lg-12 btn btn-success' onClick={this.purchase}>Purchase Add On</a>
      </div>
    );
  },
  purchase: function(e){
    var addOns = this.props.addOn[0]
    e.preventDefault()
    PaymentActions.createPaymentForm(addOns)
  }
});


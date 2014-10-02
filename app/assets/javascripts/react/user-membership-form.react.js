/** @jsx React.DOM */
//= require react
//= require stores/subscription-store
//= require react/subscriptions.react
//= require react/address-required.react
//= require actions/payment-actions

var UserMembershipForm = React.createClass({displayName: 'UserMembershipForm',
  render: function() {
    return (
      React.DOM.div(null,
        this.renderFormOrException()
      )
    );
  },
  renderFormOrException: function() {
    if(!this.props.hasAddr) return(AddressRequired(null));
    var formOptions = {
      name: "Subscription Options",
      submit: { value: "Purchase Subscription" },
      subscription: { type: 'select', values: this.allSubscriptions() },
      onSubmit: this.purchase
    }
    var object = {subscription: this.allSubscriptions()[0]};
    return(FormFor({object: object, options: formOptions, errors: this.props.errors}));
  },
  allSubscriptions: function () {
    return this.props.subscriptions.map(function (sub) {
      return { value: sub.id, show: sub.name + ' - $' + sub.price };
    });
  },

  purchase: function(data) {
    var subs = this.props.subscriptions;
    var subInfo;
    for(var i = 0; i < subs.length; i++) {
      if(subs[i].id === parseInt(data.subscription, 10)) {
        subInfo = subs[i];
        subInfo.type = 'Membership';
        break;
      }
    }
    PaymentActions.createPaymentForm(subInfo);
  }
});

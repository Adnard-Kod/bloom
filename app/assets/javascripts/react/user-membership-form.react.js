/** @jsx React.DOM */
//= require react
//= require stores/subscription-store
//= require react/subscriptions.react
//= require actions/payment-actions
//= require react/user-promotion-form.react
var UserMembershipForm = React.createClass({displayName: 'UserMembershipForm',
  render: function() {
    return (
      React.DOM.div(null,
        this.renderSubscription(),
        UserPromotionForm({errors: this.props.errors}),
        this.renderMembershipForm()
      )
    );
  },
  renderMembershipForm: function() {
    var formOptions = {
      name: "Subscription Options",
      submit: { value: "Purchase Subscription" },
      subscription: { type: 'select', values: this.allSubscriptions() },
      onSubmit: this.purchase
    }
    var object = {subscription: this.allSubscriptions()[0]};
    return(FormFor({object: object, options: formOptions, errors: this.props.errors}));
  },
  renderSubscription: function() {
    return (Subscriptions(null));
  },
  allSubscriptions: function () {
    return this.props.subscriptions.map(function (sub) {
      return { value: sub.id, show: sub.name + ' - $' + sub.price };
    });
  },

  purchase: function(data) {
    var subs = this.props.subscriptions;
    // don't modify the subscription, make a copy first.
    var subInfo = $.extend({}, this.props.subscriptions.filter(function(sub){return sub.id === parseInt(data.subscription)})[0])
    subInfo.type = 'Membership';
    PaymentActions.createPaymentForm(subInfo);
  }
});

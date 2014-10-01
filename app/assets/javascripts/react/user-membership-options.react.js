/** @jsx React.DOM */
//= require react
//= require stores/subscription-store
//= require react/subscriptions.react
//= require react/address-required.react
//= require actions/payment-actions

var UserMembershipOptions = React.createClass({displayName: 'UserMembershipOptions',
  getInitialState: function() {
    return {
      errors: [],
      subscriptions: SubscriptionStore.subscriptions()
    };
  },

  componentDidMount: function() {
    SubscriptionStore.addChangeEvent(function () {
      if (this.isMounted()) this.setState({ subscriptions: SubscriptionStore.subscriptions() });
    }.bind(this));
    SubscriptionStore.all();
  },

  render: function() {
    var formOptions = {
      name: "Subscription Options",
      submit: { value: "Purchase Subscription" },
      subscription: { type: 'select', values: this.allSubscriptions() },
      onSubmit: this.purchase
    }
    var object = {subscription: this.allSubscriptions()[0]};
    var optionsOrAddrRequired = this.props.hasAddr ? FormFor({object: object, options: formOptions, errors: this.state.errors}) : AddressRequired(null)
    return (
      React.DOM.div(null,
        optionsOrAddrRequired
      )
    );
  },

  allSubscriptions: function () {
    return this.state.subscriptions.map(function (sub) {
      return { value: sub.id, show: sub.name + ' - $' + sub.price };
    });
  },

  purchase: function(data) {
    var subs = this.state.subscriptions;
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

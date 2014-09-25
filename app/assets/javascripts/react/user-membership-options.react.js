/** @jsx React.DOM */
//= require react
//= require stores/subscription-store
//= require react/subscriptions.react

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
    return (
        FormFor({object: {subscription: this.allSubscriptions()[0]}, options: formOptions, errors: this.state.errors})
    );
  },

  allSubscriptions: function () {
    return this.state.subscriptions.map(function (sub) {
      return { value: sub.id, show: sub.name + ' - $' + sub.price };
    });
  },

  purchase: function(data) {
    console.log(data)
  }
});

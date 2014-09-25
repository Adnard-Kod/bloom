/** @jsx React.DOM */
//= require react
//= require store/subscription-store

var UserMembership = React.createClass({displayName: 'UserMembership',
  getInitialState: function() {
    return {
      subscriptions: SubscriptionStore.all()
    };
  },

  componentDidMount: function() {
    SubscriptionStore.addChangeEvent(function () {
      if (this.isMounted()) this.setState({ subscriptions: SubscriptionStore.subscriptions() });
    });
    SubscriptionStore.all();
  },

  componentWillUnmount: function() {
    SubscriptionStore.removeChangeEvent(this);
  }

});

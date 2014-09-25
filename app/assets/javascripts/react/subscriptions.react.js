/** @jsx React.DOM */
//= require react
//= require react/subscription.react
//= require stores/subscription-store
var Subscriptions = React.createClass({displayName: 'Subscriptions',
  getInitialState: function() {
    return {
      subscriptions: SubscriptionStore.subscriptions()
    };
  },
  componentDidMount: function() {
    SubscriptionStore.addChangeEvent(function() {
      this.setState({
        subscriptions: SubscriptionStore.subscriptions()
      })
    }.bind(this));
    SubscriptionStore.all();
  },
  render: function() {
    var admin = this.props.admin;
    var subscriptions = [];
    this.state.subscriptions.forEach(function(sub) {
      subscriptions.push(Subscription({key: sub.id, sub: sub, admin: admin}))
    })
    return (
      React.DOM.div({id: "subscriptions"},
        subscriptions
      )
    );
  }
})

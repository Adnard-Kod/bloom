/** @jsx React.DOM */
//= require react
//= require react/subscription.react
//= require stores/subscription-store
//= require react/subscription-form.react
var Subscriptions = React.createClass({
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
      subscriptions.push(<Subscription key={sub.id} sub={sub} admin={admin}/>)
    })
    return (
      <div className="subscriptions">
        {this.renderSubscriptionForm()}
        <h4>Current Subscriptions and Packages</h4>
        <ul className="list-group">
          {subscriptions}
        </ul>
      </div>
    );
  },
  renderSubscriptionForm: function() {
    if(this.props.admin) return(<SubscriptionForm />);
  }
})

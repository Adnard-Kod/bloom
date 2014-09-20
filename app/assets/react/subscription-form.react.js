/**
 * @jsx React.DOM
 */
//= require react
//= require stores/subscription-store
//= require react/form-builder/form-for.react
//= require stores/subscription-store
var SubscriptionForm = React.createClass({
  getInitialState: function() {
    return {
      errors: []
    };
  },
  componentDidMount: function() {
    SubscriptionStore.addFailToTakeAction(function(e, data) {
      if(this.isMounted()) this.setState({errors: data});
    }.bind(this))
    SubscriptionStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({errors: []});
    }.bind(this))
  },
  componentWillUnmount: function() {
    SubscriptionStore.removeChangeEvent(this);
    SubscriptionStore.removeFailToTakeAction(this);
  },

  render: function() {
    var subscription = this.props.subscription || SubscriptionStore.new();
    var formOptions = {
      name: "Subscription",
      onSubmit: this.handleSubmit,
      description: {
        type: 'textarea'
      }
    }
    return (
      <div>
        <FormFor object={subscription} options={formOptions} errors={this.state.errors}/>
      </div>
    );
  },
  handleSubmit: function(data) {
    SubscriptionStore.submit({editing: this.props.editing, subscription: data});
  }
})

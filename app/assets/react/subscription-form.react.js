/**
 * @jsx React.DOM
 */
//= require react
//= require stores/subscription-store
//= require react/form-builder/form-for.react
//= require stores/subscription-store
//= require actions/subscription-actions
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
  render: function() {
    var subscription = this.props.subscription || SubscriptionStore.new();
    var formOptions = {
      name: "Subscription",
      onSubmit: this.handleSubmit,
      meals: {placeholder: 'Meals per Week'},
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
    if(this.props.editing) {
      SubscriptionActions.updateSubscription(data)
    } else {
      SubscriptionActions.createSubscription(data)
    }
  }
})

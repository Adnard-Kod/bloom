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
    return (
      <div>
        {this.renderErrors()}
        <FormFor object={subscription} options={{onSubmit: this.handleSubmit}}/>
      </div>
      // <form onSubmit={this.handleSubmit}>

      //   <input ref="id" type="hidden" value={sub.id} />
      //   <input ref="price" type="number" step="0.1" placeholder="Price" defaultValue={sub.price} />
      //   <input ref="meals" type="number" step="6" placeholder="Number of Meals" defaultValue={sub.meals} />
      //   <input ref="weeks" type="number" step="1" placeholder="Number of Weeks" defaultValue={sub.weeks} />
      //   <textarea ref="description" placeholder="Description" defaultValue={sub.description}/>
      //   <input type="submit" value="Create Subscription" />
      // </form>
    );
  },
  renderErrors: function() {
    var errors = [];
    this.state.errors.forEach(function(err) {
      errors.push(<li>{err}</li>)
    })
    return (
      <ul className="form-errors">{errors}</ul>
    )
  },

  handleSubmit: function(data) {
    SubscriptionStore.submit({editing: this.props.editing, subscription: data});
  }
})

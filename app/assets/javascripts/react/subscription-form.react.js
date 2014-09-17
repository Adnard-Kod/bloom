/**
 * @jsx React.DOM
 */
 //= require react
 //= require stores/subscription-store
var SubscriptionForm = React.createClass({displayName: 'SubscriptionForm',
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
    var sub = this.props.subscription;
    return (
      React.DOM.form({onSubmit: this.handleSubmit}, 
        this.renderErrors(), 
        React.DOM.input({ref: "id", type: "hidden", value: sub.id}), 
        React.DOM.input({ref: "price", type: "number", step: "0.1", placeholder: "Price", defaultValue: sub.price}), 
        React.DOM.input({ref: "meals", type: "number", step: "6", placeholder: "Number of Meals", defaultValue: sub.meals}), 
        React.DOM.input({ref: "weeks", type: "number", step: "1", placeholder: "Number of Weeks", defaultValue: sub.weeks}), 
        React.DOM.textarea({ref: "description", placeholder: "Description", defaultValue: sub.description}), 
        React.DOM.input({type: "submit", value: "Create Subscription"})
      )
    );
  },
  renderErrors: function() {
    var errors = [];
    this.state.errors.forEach(function(err) {
      errors.push(React.DOM.li(null, err))
    })
    return (
      React.DOM.ul({className: "form-errors"}, errors)
    )
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var data = {};
    Object.keys(this.refs).forEach(function(ref) {
      var value = this.refs[ref].getDOMNode().value;
      data[ref] = value;
    }.bind(this))
    SubscriptionStore.submit({editing: this.props.editing, subscription: data});
  }
})

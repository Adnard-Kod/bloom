/**
 * @jsx React.DOM
 */
 //= require stores/subscription-store
//= require react/subscription-form.react
//= require actions/subscription-actions
//= require react/edit-links.react

 var Subscription = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    };
  },
  getDefaultProps: function() {
    return {
      admin: false
    };
  },
  componentDidMount: function() {
    SubscriptionStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({editing: false});
    }.bind(this))
  },
  render: function() {
    var sub = this.props.sub;
    var editForm = this.state.editing ? <SubscriptionForm subscription={sub} editing="true"/> : undefined;
    var adminButtons = this.props.admin ? <EditLinks /> : undefined
    return (
      <li>
        <p>{sub.name}: {sub.description} for ${sub.price}</p>
        {adminButtons}
        {editForm}
      </li>
    );
  },
  edit: function(e) {
    e.preventDefault();
    this.setState({editing: !this.state.editing})
  },
  delete: function(e) {
    e.preventDefault();
    SubscriptionActions.destroySubscription(this.props.sub.id);
  }
 })


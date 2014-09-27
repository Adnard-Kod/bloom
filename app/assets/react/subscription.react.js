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
    return (
      <li className="list-group-item">
        <p>{sub.name}: {sub.description} for ${sub.price}</p>
        {this.renderAdminButtons()}
        {this.renderEditForm()}
      </li>
    );
  },
  renderAdminButtons: function() {
    if(this.props.admin) {
      var editLinks = [
        {handler: this.edit, name: 'edit', className: 'text-warning'},
        {handler: this.delete, name: 'delete', className: 'text-danger'}
      ];
      return(<EditLinks links={editLinks} />);
    }
  },
  renderEditForm: function() {
    if (this.state.editing) return(<SubscriptionForm subscription={this.props.sub} editing="true"/>);
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


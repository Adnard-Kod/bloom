/**
 * @jsx React.DOM
 */
 //= require stores/subscription-store
  //= require react/subscription-form.react
 var Subscription = React.createClass({displayName: 'Subscription',
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    SubscriptionStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({editing: false});
    }.bind(this))
  },
  componentWillUnmount: function() {
    SubscriptionStore.removeChangeEvent(this);
  },

  render: function() {
    var sub = this.props.sub;
    var editForm = this.state.editing ? SubscriptionForm( {subscription:sub, editing:"true"}) : undefined;
    return (
      React.DOM.li(null,
        React.DOM.p(null, sub.name,": ", sub.description, " for $",sub.price),
        React.DOM.span(null, React.DOM.a( {href:"#", onClick:this.edit}, "edit")),
        React.DOM.span(null, React.DOM.a( {href:"#", onClick:this.delete}, "delete")),
        editForm
      )
    );
  },
  edit: function(e) {
    e.preventDefault();
    var editing = this.state.editing === true ? false : true
    this.setState({editing: editing})
  },
  delete: function(e) {
    e.preventDefault();
    SubscriptionStore.destroy(this.props.sub.id);
  }
 })

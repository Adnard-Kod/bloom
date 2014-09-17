/**
 * @jsx React.DOM
 */
 //= require stores/subscription-store
  //= require react/subscription-form.react
 var Subscription = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    SubscriptionStore.addChangeEvent(function() {
      this.setState({editing: false});
    }.bind(this))
  },
  render: function() {
    var sub = this.props.sub;
    console.log(sub)
    var editForm = this.state.editing ? <SubscriptionForm subscription={sub} editing="true"/> : undefined;
    return (
      <li>
        <p>{sub.name}: {sub.description} for ${sub.price}</p>
        <span><a href="#" onClick={this.edit}>edit</a></span>
        <span><a href="#" onClick={this.delete}>delete</a></span>
        {editForm}
      </li>
    );
  },
  edit: function(e) {
    e.preventDefault();
    var editing = this.state.editing === true ? false : true
    this.setState({editing: editing})
  },
  delete: function(e) {
    e.preventDefault();
  }
 })

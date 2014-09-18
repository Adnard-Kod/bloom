/**
 * @jsx React.DOM
 */
//= require react
//= require stores/menu-store
var MenuForm = React.createClass({
  getInitialState: function() {
    return {
      errors: []
    };
  },
  componentDidMount: function() {
    MenuStore.addFailToTakeAction(function(e, data) {
      if(this.isMounted()) this.setState({errors: data});
    }.bind(this))
    MenuStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({errors: []});
    }.bind(this))
  },
  componentWillUnmount: function() {
    MenuStore.removeChangeEvent(this);
    MenuStore.removeFailToTakeAction(this);
  },

  render: function() {
    var menu = this.props.menu;
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderErrors()}
        <input ref="id" type="hidden" value={menu.id} />
        <input ref="title" type="text" placeholder="Menu Title" defaultValue={menu.title} />
        <input type="submit" value="Create Menu" />
      </form>
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
  handleSubmit: function(e) {
    e.preventDefault();
    var data = {};
    Object.keys(this.refs).forEach(function(ref) {
      var value = this.refs[ref].getDOMNode().value;
      data[ref] = value;
    }.bind(this))
    MenuStore.submit({editing: this.props.editing, menu: data});
  }
})
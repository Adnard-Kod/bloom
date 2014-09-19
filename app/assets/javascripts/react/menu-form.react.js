/**
 * @jsx React.DOM
 */
//= require react
//= require stores/menu-store
var MenuForm = React.createClass({displayName: 'MenuForm',
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
      React.DOM.form( {onSubmit:this.handleSubmit}, 
        this.renderErrors(),
        React.DOM.input( {ref:"id", type:"hidden", value:menu.id} ),
        React.DOM.input( {ref:"title", type:"text", placeholder:"Menu Title", defaultValue:menu.title} ),
        React.DOM.input( {type:"submit", value:"Create Menu"} )
      )
    );
  },
  renderErrors: function() {
    var errors = [];
    this.state.errors.forEach(function(err) {
      errors.push(React.DOM.li(null, err))
    })
    return (
      React.DOM.ul( {className:"form-errors"}, errors)
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
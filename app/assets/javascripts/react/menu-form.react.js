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
    var menu = this.props.menu || MenuStore.new();
    var formOptions = {
      name: "Menu",
      onSubmit: this.handleSubmit
    }
    return (
      React.DOM.div(null, 
        FormFor( {object:menu, options:formOptions, errors:this.state.errors})
      )
    );
  },
  handleSubmit: function(data) {
    MenuStore.submit({editing: this.props.editing, menu: data});
  }
})

/**
 * @jsx React.DOM
 */
//= require react
//= require stores/menu-item-store
//= require react/form-builder/form-for.react
//= require actions/menu-item-actions

var MenuItemForm = React.createClass({displayName: 'MenuItemForm',
  getInitialState: function() {
    return {
      errors: []
    };
  },
  componentDidMount: function() {
    MenuItemStore.addFailToTakeAction(function(e, data) {
      if(this.isMounted()) this.setState({errors: data});
    }.bind(this))
    MenuItemStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({errors: []});
    }.bind(this))
  },
  componentWillUnmount: function() {
    MenuItemStore.removeChangeEvent(this);
    MenuItemStore.removeFailToTakeAction(this);
  },

  render: function() {
    var menuItem = this.props.menuItem || MenuItemStore.new();
    var formOptions = {
      name: "Menu Item",
      onSubmit: this.handleSubmit
    }
    return (
      React.DOM.div(null,
        FormFor({object: menuItem, options: formOptions, errors: this.state.errors})
      )
    );
  },
  handleSubmit: function(data) {
    if(this.props.editing) {
      MenuItemActions.updateMenuItem(data)
    } else {
      MenuItemActions.createMenuItem(data)
    }
  }
})

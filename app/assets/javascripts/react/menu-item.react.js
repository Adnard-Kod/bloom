/**
 * @jsx React.DOM
 */

//= require react
//= require stores/menu-item-store
//= require react/menu-item-form.react
//= require react/edit-links.react
var MenuItem = React.createClass({displayName: 'MenuItem',
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    MenuItemStore.addChangeEvent(function()
    {
      if(this.isMounted()) this.setState({editing:false});
    }.bind(this))
  },
  componentWillUnmount: function() {
    SubscriptionStore.removeChangeEvent(this);
  },

  render: function() {
    var menuItem = this.props.menuItem;
    var editForm = this.state.editing ? MenuItemForm({menuItem: menuItem, editing: "true"}) :undefined;
    return (
      React.DOM.li(null,
        React.DOM.b(null, menuItem.name, " (", menuItem.category, "): "),
        EditLinks({edit: this.edit, delete: this.delete}),
        React.DOM.p(null, menuItem.description),
        editForm
      )
    );
  },
  edit: function(e) {
    e.preventDefault();
    this.setState({editing: !this.state.editing})
  },
  delete: function(e) {
    e.preventDefault();
    MenuItemActions.destroyMenuItem(this.props.menuItem.id);
  }
})

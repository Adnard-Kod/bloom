/**
 * @jsx React.DOM
 */

//= require react
//= require stores/menu-store
//= require react/menu-form.react
//= require react/menu-items.react
//= require react/edit-links.react
//= require react/list-group.react
//= require actions/menu-actions
var Menu = React.createClass({displayName: 'Menu',
  getInitialState: function() {
    return {
      editing: false,
      items: [{id: 1, name: "burger", description: "sweet burger"}, {id: 2, name: "vegie", description: "sweet vegie"}],
      allItems: [{id: 1, name: "burger", description: "sweet burger"}, {id: 3, name: "sweet potatoes", description: "sweet potatoes"}],
      errors: []
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({editing:false});
    }.bind(this))
  },
  componentWillUnmount: function() {
    SubscriptionStore.removeChangeEvent(this);
  },

  render: function() {
    var menu = this.props.menu;
    var editForm = this.state.editing ? MenuForm({menu: menu, editing: "true"}) :undefined;
    var panelClass = "panel panel-primary";
     var formOptions = {
      name: "Menu Item",
      submit: { value: "Add Menu Item" },
      item: { type: 'select', values: this.allItems()},
      onSubmit: this.addItem
    }
    if(this.props.active) panelClass = "panel panel-success"
    return (
      React.DOM.div({className: panelClass},
        React.DOM.div({className: "panel-heading"},
          React.DOM.h3({className: "panel-title"},
            menu.title,
            EditLinks({edit: this.edit, delete: this.delete})
          ),
          editForm
        ),
        React.DOM.div({className: "panel-body"},
          ListGroup({list: this.state.items, removeHandler: this.removeItem}),
          FormFor({object: {id: menu.id, item: this.allItems()[0]}, options: formOptions, errors: this.state.errors})
        )
      )
    );
  },
  edit: function(e) {
    e.preventDefault();
    this.setState({editing: !this.state.editing})
  },
  delete: function(e) {
    e.preventDefault();
    MenuActions.destroyMenu(this.props.menu.id);
  },
  removeItem: function(e) {
    e.preventDefault();
  },
  addItem: function(data) {
    console.log(data);
  },
  allItems: function() {
    return this.state.allItems.map(function(item) {
      return {value: item.id, show: item.name}
    })
  }
})

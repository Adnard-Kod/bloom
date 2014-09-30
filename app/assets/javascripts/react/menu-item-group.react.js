/**
 * @jsx React.DOM
 */
//= require react
//= require react/list-group.react
//= require stores/selected-item-store
//= require react/edit-links.react
//= require actions/selected-item-actions
//= require stores/menu-item-store
var MenuItemGroup = React.createClass({displayName: 'MenuItemGroup',
  getInitialState: function() {
    return {
      errors: []
    };
  },
  componentDidMount: function() {
    SelectedItemStore.addFailToTakeAction(function(e, data) {
      this.setState({errors: data})
    }.bind(this))
  },
  render: function() {
    return (
      React.DOM.div({className: "panel-body"},
        this.renderDefaults(),
        this.renderEntres(),
        this.renderSidedishes(),
        this.renderSelectionForm()
      )
    )
  },
  renderDefaults: function() {
    if(this.props.admin) {
      return this.renderSection('Defaults', this.props.menu.selected_items.filter(function(item) {
        return item.default;
      }));
    }
  },
  renderEntres: function() {
    return this.renderSection('Entres', this.props.menu.selected_items.filter(function(item) {
      return item.menu_item.category === 'Entre';
    }))
  },
  renderSidedishes: function() {
   return this.renderSection('Sidedishes', this.props.menu.selected_items.filter(function(item) {
      return item.menu_item.category === 'Sidedish';
    }))
  },
  renderSection: function(name, list) {
    return (React.DOM.div(null, React.DOM.h4(null, React.DOM.i(null, name)), ListGroup({list: list, id: this.props.menu.id, admin: this.props.admin, user: this.props.user, selected: this.props.selected})));
  },
  renderSelectionForm: function() {
    if(this.props.admin) {
      var formOptions = {
        name: "Menu Item",
        submit: { value: "Add Menu Item" },
        item: { type: 'select', values: this.allItems()},
        onSubmit: this.addItem
      }
      if(this.props.admin) return(FormFor({object: {id: this.props.menu.id, item: this.allItems()[0]}, options: formOptions, errors: this.state.errors}));
    }
  },
  addItem: function(data) {
    SelectedItemActions.createSelectedItem(data.id, data.item);
  },
  allItems: function() {
    return this.props.menuItems.map(function(item) {
      return {value: item.id, show: item.name}
    })
  }

});

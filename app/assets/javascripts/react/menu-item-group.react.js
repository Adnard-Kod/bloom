/**
 * @jsx React.DOM
 */
//= require react
//= require react/list-group.react
//= require stores/selected-item-store
//= require react/edit-links.react
//= require actions/selected-item-actions
var MenuItemGroup = React.createClass({displayName: 'MenuItemGroup',
  getInitialState: function() {
    return {
      items: SelectedItemStore.selectedItems(this.props.menu.id),
      allItems: MenuItemStore.menuItems()
    };
  },
  componentDidMount: function() {
    MenuItemStore.addChangeEvent(function(data) {
      if(this.isMounted()) this.setState({allItems: MenuItemStore.menuItems()});
    }.bind(this))
    SelectedItemStore.addChangeEvent(function(data) {
      if(this.isMounted()) this.setState({items: SelectedItemStore.selectedItems(this.props.menu.id)});
    }.bind(this))
    MenuItemStore.all();
    SelectedItemStore.all(this.props.menu.id);
  },
  render: function() {
    var itemEditLinks = [
      {handler: this.makeDefault, name: 'make default', className: 'text-warning'},
      {handler: this.removeDefault, name: 'remove default', className: 'text-warning'},
      {handler: this.removeItem, name: 'x', className: 'text-danger'}
    ]
    var formOptions = {
      name: "Menu Item",
      submit: { value: "Add Menu Item" },
      item: { type: 'select', values: this.allItems()},
      onSubmit: this.addItem
    }
    return (
      React.DOM.div({className: "panel-body"},
        ListGroup({list: this.state.items, itemEditLinks: itemEditLinks}),
        FormFor({object: {id: this.props.menu.id, item: this.allItems()[0]}, options: formOptions, errors: []})
      )
    )
  },
  makeDefault: function(e) {
    e.preventDefault();
  },
  removeDefault: function(e) {
    e.preventDefault();
  },
  removeItem: function(e) {
    e.preventDefault();
  },
  addItem: function(data) {
    SelectedItemActions.createSelectedItem(data.id, data.item);
  },
  selectItem: function(e) {
    SelectedItemActions.makeDefault(this.props.menu.id, id)
  },
  allItems: function() {
    return this.state.allItems.map(function(item) {
      return {value: item.id, show: item.name}
    })
  }

});

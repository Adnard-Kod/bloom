/**
 * @jsx React.DOM
 */
//= require react
//= require react/list-group.react
//= require stores/selected-item-store
//= require react/edit-links.react
//= require actions/selected-item-actions
var MenuItemGroup = React.createClass({
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
    return (
      <div className="panel-body">
        <h4><i>Defaults:</i></h4>
        {this.renderDefaults()}
        <hr />
        <h4><i>Entres:</i></h4>
        {this.renderEntres()}
        <hr />
        <h4><i>Sidedishes:</i></h4>
        {this.renderSidedishes()}
        {this.renderSelectionForm()}
      </div>
    )
  },
  renderDefaults: function() {
    return this.renderSection(this.state.items.filter(function(item) {
      return item.default;
    }))
  },
  renderEntres: function() {
    return this.renderSection(this.state.items.filter(function(item) {
      return item.menu_item.category === 'Entre';
    }))
  },
  renderSidedishes: function() {
   return this.renderSection(this.state.items.filter(function(item) {
      return item.menu_item.category === 'Sidedish';
    }))
  },
  renderSection: function(list) {
    return this.transferPropsTo(<ListGroup list={list} id={this.props.menu.id}/>);
  },
  renderSelectionForm: function() {
    var formOptions = {
      name: "Menu Item",
      submit: { value: "Add Menu Item" },
      item: { type: 'select', values: this.allItems()},
      onSubmit: this.addItem
    }
    if(this.props.admin) return(<FormFor object={{id: this.props.menu.id, item: this.allItems()[0]}} options={formOptions} errors={[]}/>);
  },
  addItem: function(data) {
    SelectedItemActions.createSelectedItem(data.id, data.item);
  },
  allItems: function() {
    return this.state.allItems.map(function(item) {
      return {value: item.id, show: item.name}
    })
  }

});

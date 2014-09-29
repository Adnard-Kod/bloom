/**
 * @jsx React.DOM
 */
//= require react
//= require react/list-group.react
//= require stores/selected-item-store
//= require react/edit-links.react
//= require actions/selected-item-actions
//= require stores/menu-item-store
var MenuItemGroup = React.createClass({
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
    return this.renderSection(this.props.menu.selected_items.filter(function(item) {
      return item.default;
    }))
  },
  renderEntres: function() {
    return this.renderSection(this.props.menu.selected_items.filter(function(item) {
      return item.menu_item.category === 'Entre';
    }))
  },
  renderSidedishes: function() {
   return this.renderSection(this.props.menu.selected_items.filter(function(item) {
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
    if(this.props.admin) return(<FormFor object={{id: this.props.menu.id, item: this.allItems()[0]}} options={formOptions} errors={this.state.errors}/>);
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

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
      if(this.isMounted()) this.setState({errors: data});
    }.bind(this))
  },
  render: function() {
    return (
      <div className="panel-body">
        {this.renderDefaults()}
        {this.renderEntrees()}
        {this.renderSidedishes()}
        {this.renderSelectionForm()}
      </div>
    )
  },
  renderDefaults: function() {
    if(this.props.admin) {
      return this.renderSection('Defaults', 'default', this.props.menu.selected_items.filter(function(item) {
        return item.default;
      }));
    }
  },
  renderEntrees: function() {
    return this.renderSection('Entrees', 'entree', this.props.menu.selected_items.filter(function(item) {
      return item.menu_item.category === 'Entree';
    }))
  },
  renderSidedishes: function() {
   return this.renderSection('Side Dishes', 'side-dish', this.props.menu.selected_items.filter(function(item) {
      return item.menu_item.category === 'Side Dish';
    }))
  },
  renderSection: function(name, categoryClass, list) {
    return (
      <div>
        <h4><i>{name}</i></h4>
        <ListGroup list={list} categoryClass={categoryClass} id={this.props.menu.id} admin={this.props.admin} user={this.props.user} selected={this.props.selected}/>
      </div>
    );
  },
  renderSelectionForm: function() {
    if(this.props.admin) {
      var formOptions = {
        name: "Menu Item",
        submit: { value: "Add Menu Item" },
        item: { type: 'select', values: this.allItems()},
        onSubmit: this.addItem
      }
      if(this.props.admin) return(<FormFor object={{id: this.props.menu.id, item: this.allItems()[0]}} options={formOptions} errors={this.state.errors}/>);
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

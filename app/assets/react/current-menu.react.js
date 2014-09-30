/** @jsx React.DOM */
//= require react
//= require stores/menu-store
//= require stores/user-selected-item-store
//= require react/menu.react
var CurrentMenu = React.createClass({
  getInitialState: function() {
    return {
      menu: {},
      selectedItems: {}
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function(e, data) {
      this.setState({menu: data.menu, selectedItems: data.selected_items })
      UserSelectedItemStore.setSelectedItems(data.selected_items);
    }.bind(this))
    MenuStore.getCurrentMenu();
    UserSelectedItemStore.addChangeEvent(function() {
      this.setState({selectedItems: UserSelectedItemStore.selectedItems() })
    }.bind(this))
  },
  render: function () {
    return (
      <div>
        <div className="col-lg-6">
          <h3>{"This Week's Menu"}</h3>
          <Menu menu={this.state.menu} user={true} />
        </div>
        <div className="col-lg-6">
          <h3>Your Selected Meals</h3>
          {this.renderDefaultSelectedItems()}
        </div>
      </div>
    )
  },
  renderDefaultSelectedItems: function() {
    if(this.state.menu.id)
      return(<MenuItemGroup menu={{selected_items: this.state.selectedItems}} user={true} selected={true} />);
  },
});

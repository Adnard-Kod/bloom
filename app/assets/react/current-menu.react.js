/** @jsx React.DOM */
//= require react
//= require stores/menu-store
//= require react/menu.react
var CurrentMenu = React.createClass({
  getInitialState: function() {
    return {
      menu: {},
      selectedItems: {}
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function() {
      var menu = MenuStore.currentMenu();
      selectedItems = menu.selected_items.filter(function(item) {
        return item.default;
      });
      this.setState({menu: menu, selectedItems: selectedItems })
    }.bind(this))
    MenuStore.all();
  },
  render: function () {
    return (
      <div>
        <div className="col-lg-6">
          <h3>{"This Week's Menu"}</h3>
          <Menu menu={this.state.menu} />
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
      return(<MenuItemGroup menu={{selected_items: this.state.selectedItems}} />);
  },
});

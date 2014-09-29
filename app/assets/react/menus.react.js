/**
 * @jsx React.DOM
 */

//= require react
//= require stores/menu-store
//= require stores/selected-item-store
//= require react/menu.react
var Menus = React.createClass({
  getInitialState: function() {
    return {
      menuItems: MenuItemStore.menuItems(),
      selectedMenuItems: SelectedItemStore.selectedItems(),
      menus: MenuStore.menus()
    };
  },
  componentDidMount: function() {
    this.updateMenusState()
    this.updateSelectedMenuItemsState();
    if(this.props.admin) this.updateMenuItemState();
  },
  render: function() {
    var menus = []
    this.state.menus.forEach(function(menu) {
      menus.push(this.transferPropsTo(<Menu key={menu.id} menu={menu} menuItems={this.state.menuItems}/>))
    }.bind(this));
    return (
      <div id="menus">
        <hr />
        {menus}
      </div>
    );
  },
  updateMenusState: function() {
    MenuStore.addChangeEvent(function() {
      if(this.isMounted()) {
        this.setState({ menus: MenuStore.menus() });
        var selectedMenuItems = {};
        MenuStore.menus().forEach(function(menu) {
          selectedMenuItems[menu.id] = menu.selected_items;
        })
        SelectedItemStore.setSelectedItems(selectedMenuItems)
      }
    }.bind(this));
    MenuStore.all();
  },
  updateMenuItemState: function() {
    MenuItemStore.addChangeEvent(function(data) {
      if(this.isMounted()) this.setState({menuItems: MenuItemStore.menuItems()});
    }.bind(this))
    MenuItemStore.all();
  },
  updateSelectedMenuItemsState: function() {
    SelectedItemStore.addChangeEvent(function() {
      this.setState({selectedMenuItems: SelectedItemStore.selectedItems()})
    }.bind(this));
  }
})

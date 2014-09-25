/** @jsx React.DOM */
//= require react
//= require stores/menu-item-store
//= require react/menu-item.react

var MenuItems = React.createClass({displayName: 'MenuItems',
  getInitialState: function() {
    return {
      menuItems: MenuItemStore.menuItems()
    };
  },
  componentDidMount: function() {
    MenuItemStore.addChangeEvent(function() {
      if(this.isMounted()) {
        this.setState({
          menuItems: MenuItemStore.menuItems()
        });
      }
    }.bind(this))
    MenuItemStore.all()
  },
  render:function(){
    var menuItems = []
    this.state.menuItems.forEach(function(item){
      menuItems.push(MenuItem({key: item.id, menuItem: item}))
    })
    return (
      React.DOM.div({className: "menu-items"},
        menuItems
      )
    )
  }
})

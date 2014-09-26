/**
 * @jsx React.DOM
 */

//= require react
//= require stores/menu-store
//= require react/menu.react
var Menus = React.createClass({
  getInitialState: function() {
    return {
      menus: MenuStore.menus()
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({ menus: MenuStore.menus() });
    }.bind(this));
    MenuStore.all();
  },
  render: function() {
    var menus = []
    this.state.menus.forEach(function(menu) {
      menus.push(this.transferPropsTo(<Menu key={menu.id} menu={menu} />))
    }.bind(this));
    return (
      <div id="menus">
        <hr />
        {menus}
      </div>
    );
  }
})

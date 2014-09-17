/**
 * @jsx React.DOM
 */

//= require react
//= require stores/menu-store

var Menus = React.createClass({
  getInitialState: function() {
    return {
      menus: MenuStore.menus()
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function() {
      this.setState({
        menus: MenuStore.menus()
      });
    }.bind(this));
    MenuStore.all();
  },
  render: function() {
    var menus = []
    this.state.menus.forEach(function(menu) {
      menus.push(<Menu menu={menu} />)
    })
    return (
      <div id="menus">
        <h3>Menus</h3>
        {menus}
      </div>
    );
  }
})

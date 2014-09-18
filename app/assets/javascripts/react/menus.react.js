/**
 * @jsx React.DOM
 */

//= require react
//= require stores/menu-store
//= require react/menu.react
var Menus = React.createClass({displayName: 'Menus',
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
      menus.push(Menu( {menu:menu} ))
    })
    return (
      React.DOM.div( {id:"menus"},
        React.DOM.h3(null, "Menus"),
        menus
      )
    );
  }
})

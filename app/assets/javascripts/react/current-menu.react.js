/** @jsx React.DOM */
//= require react
//= require stores/menu-store
//= require react/menu.react
var CurrentMenu = React.createClass({displayName: 'CurrentMenu',
  getInitialState: function() {
    return {
      menu: {}
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function() {
      this.setState({menu: MenuStore.currentMenu()})
    }.bind(this))
    MenuStore.all();
  },
  render: function () {
    return (
      React.DOM.div(null,
        React.DOM.h3(null, "This Week's Menu"),
        Menu({menu: this.state.menu})
      )
    )
  }
});

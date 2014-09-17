/**
 * @jsx React.DOM
 */

//= require react
//= require stores/menu-store

var Menu = React.createClass({displayName: 'Menu',
  getInitialState: function() {
    return {
      editing: false
    };
  },
  render: function() {
    var menu = this.props.menu;
    return (
      React.DOM.li(null, 
        React.DOM.p(null, menu.title)
      )
    );
  }
})

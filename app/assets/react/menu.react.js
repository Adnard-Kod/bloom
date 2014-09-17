/**
 * @jsx React.DOM
 */

//= require react
//= require stores/menu-store

var Menu = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    };
  },
  render: function() {
    var menu = this.props.menu;
    return (
      <li>
        <p>{menu.title}</p>
      </li>
    );
  }
})

/** @jsx React.DOM */
//= require react
//= require react/menu-items.react

var MenuItemBox = React.createClass({displayName: 'MenuItemBox',
  render: function(){
    return (
      React.DOM.div(null, 
        MenuItems(null)
      )
    )
  }
})

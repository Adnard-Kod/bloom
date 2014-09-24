/** @jsx React.DOM */
//= require react
//= require react/menu-items.react
//= require react/menu-item-form.react

var MenuItemBox = React.createClass({displayName: 'MenuItemBox',
  render: function(){
    return (
      React.DOM.div(null,
        MenuItemForm(null),
        MenuItems(null)
      )
    )
  }
})

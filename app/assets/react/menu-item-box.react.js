/** @jsx React.DOM */
//= require react
//= require react/menu-items.react
//= require react/menu-item-form.react

var MenuItemBox = React.createClass({
  render: function(){
    return (
      <div>
        <MenuItemForm />
        <MenuItems />
      </div>
    )
  }
})

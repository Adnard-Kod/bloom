/** @jsx React.DOM */
//= require react
//= require react/subscriptions.react
//= require react/subscription-form.react
//= require react/menus.react
//= require react/menu-item-box.react
var AdminDashboard = React.createClass({
  render: function() {
    return (
      <div id="admin-dashboard">
        <SubscriptionForm />
        <Subscriptions />
        <MenuForm />
        <Menus />
        <MenuItemBox />
      </div>
    )
  }
})

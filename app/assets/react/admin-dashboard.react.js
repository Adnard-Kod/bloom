/** @jsx React.DOM */
//= require react
//= require react/subscriptions.react
//= require react/subscription-form.react
//= require react/menus.react
var AdminDashboard = React.createClass({
  render: function() {
    return (
      <div id="admin-dashboard">
        <SubscriptionForm />
        <Subscriptions />
        <MenuForm menu={{}}/>
        <Menus />
      </div>
    )
  }
})

$(document).ready(function() {
  React.renderComponent(<AdminDashboard />, $('body')[0]);
});

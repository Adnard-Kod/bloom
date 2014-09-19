/** @jsx React.DOM */
//= require react
//= require react/subscriptions.react
//= require react/subscription-form.react
//= require react/menus.react

var AdminDashboard = React.createClass({displayName: 'AdminDashboard',
  render: function() {
    return (
      React.DOM.div( {id:"admin-dashboard"}, 
        SubscriptionForm( {subscription:{}}),
        Subscriptions(null ),
        MenuForm( {menu:{}}),
        Menus(null )
      )
    )
  }
})

$(document).ready(function() {
  React.renderComponent(AdminDashboard(null ), $('body')[0]);
});

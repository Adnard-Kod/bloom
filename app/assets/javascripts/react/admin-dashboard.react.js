/** @jsx React.DOM */
//= require react
//= require react/subscriptions.react
//= require react/subscription-form.react
//= require react/menus.react
//= require react/menu-item-box.react
var AdminDashboard = React.createClass({displayName: 'AdminDashboard',
  render: function() {
    return (
      React.DOM.div({id: "admin-dashboard"},
        SubscriptionForm(null),
        Subscriptions(null),
        MenuForm(null),
        Menus(null),
        MenuItemBox(null)
      )
    )
  }
})

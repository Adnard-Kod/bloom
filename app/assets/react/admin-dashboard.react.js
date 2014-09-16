/** @jsx React.DOM */
//= require react
//= require react/subscriptions.react
//= require react/subscription-form.react
var AdminDashboard = React.createClass({
  render: function() {
    return (
      <div id="admin-dashboard">
        <Subscriptions />
        <SubscriptionForm />
      </div>
    )
  }
})

$(document).ready(function() {
  React.renderComponent(<AdminDashboard />, $('body')[0]);
});

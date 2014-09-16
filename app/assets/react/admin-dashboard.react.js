/** @jsx React.DOM */
//= require react
//= require react/subscriptions.react
var AdminDashboard = React.createClass({
  render: function() {
    return (
      <div id="admin-dashboard">
        <Subscriptions />
      </div>
    )
  }
})

$(document).ready(function() {
  React.renderComponent(<AdminDashboard />, $('body')[0]);
});

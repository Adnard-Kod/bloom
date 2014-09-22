/** @jsx React.DOM */
//= require react
//= require react/user-logout.react

var UserDashboard = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Blooming Spoon User Dashboard</h1>
        <UserLogout />
      </div>
    )
  }
});

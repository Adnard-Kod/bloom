/** @jsx React.DOM */
//= require react
//= require react/user-logout.react

var UserDashboard = React.createClass({displayName: 'UserDashboard',
  render: function () {
    return (
      React.DOM.div(null,
        React.DOM.h1(null, "Blooming Spoon User Dashboard"),
        UserLogout(null)
      )
    )
  }
});

/** @jsx React.DOM */
//= require react

var UserLogout = React.createClass({displayName: 'UserLogout',
  render: function () {
    return (
      React.DOM.div({id: "user-logout"}, 
        React.DOM.button({onClick: this.userLogout}, "Logout")
      )
    )
  },

  userLogout: function (e) {
    e.preventDefault();
    SessionStore.logout();
  }
});

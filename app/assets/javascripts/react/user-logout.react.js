/** @jsx React.DOM */
//= require react
//= require stores/session-store

var UserLogout = React.createClass({displayName: 'UserLogout',
  render: function () {
    return (
      React.DOM.div( {id:"user-logout"},
        React.DOM.a( {href:"#", onClick:this.userLogout}, "Logout")
      )
    )
  },

  userLogout: function (e) {
    e.preventDefault();
    SessionStore.logout();
  }
});

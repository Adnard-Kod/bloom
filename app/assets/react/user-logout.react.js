/** @jsx React.DOM */
//= require react
//= require stores/session-store

var UserLogout = React.createClass({
  render: function () {
    return (
      <div id="user-logout">
        <a href="#" onClick={this.userLogout}>Logout</a>
      </div>
    )
  },

  userLogout: function (e) {
    e.preventDefault();
    SessionStore.logout();
  }
});

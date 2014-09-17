/** @jsx React.DOM */
//= require react

var UserLogout = React.createClass({
  render: function () {
    return (
      <div id="user-logout">
        <button onClick={this.userLogout}>Logout</button>
      </div>
    )
  },

  userLogout: function (e) {
    e.preventDefault();
    SessionStore.logout();
  }
});

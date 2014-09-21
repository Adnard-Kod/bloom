/** @jsx React.DOM */
//= require react
//= require stores/session-store
//= require actions/session-actions
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
    SessionActions.destroySession();
  }
});

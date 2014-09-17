/** @jsx React.DOM */
//= require react
//= require stores/session-store

var UserLogin = React.createClass({
  render: function () {
    return (
      <nav id="user-login">
        <p>Login</p>
        <form id="user-login-form" onSubmit={this.userLogin}>
          <input ref="email" placeholder="example@example.com" type="email" />
          <input ref="password" placeholder="password" type="password" maxLength="30" />
          <input type="submit" value="Login" />
        </form>
      </nav>
    )
  },

  userLogin: function (e) {
    e.preventDefault();
    var formData = {};
    formData.user = {};
    Object.keys(this.refs).forEach(function (ref) {
      formData.user[ref] = this.refs[ref].getDOMNode().value;
    }.bind(this));
    SessionStore.login(formData);
  }
});

/** @jsx React.DOM */
//= require react
//= require stores/session-store
//= require react/form-error.react

var UserLogin = React.createClass({
  getInitialState: function() {
    return {
      errors: []
    };
  },

  componentDidMount: function() {
    $(SessionStore).on('login-error', function (e, userLoginErrors) {
      this.setState({
        errors: userLoginErrors.errors
      })
    }.bind(this));
  },

  render: function () {
    var errors = [];
    this.state.errors.forEach(function (err) {
      errors.push(<FormError error = {err} />)
    });

    return (
      <nav id="user-login">
        <ul className="errors">{errors}</ul>
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

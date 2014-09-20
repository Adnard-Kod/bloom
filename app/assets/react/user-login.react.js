/** @jsx React.DOM */
//= require react
//= require stores/session-store
//= require react/form-error.react
//= require react/form-builder/form-for.react
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
    var fomrOptions = {
      onSubmit: this.userLogin
    }
    this.state.errors.forEach(function (err) {
      errors.push(<FormError error = {err} />)
    });

    return (
      <nav id="user-login">
        <p>Login</p>
        <FormFor object={SessionStore.new()} options={fomrOptions} errors={this.state.errors}/>
      </nav>
    )
  },

  userLogin: function (data) {
    SessionStore.login(data);
  }
});

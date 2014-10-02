/** @jsx React.DOM */
//= require react
//= require stores/session-store
//= require react/form-builder/form-for.react
//= require actions/session-actions
var UserLogin = React.createClass({displayName: 'UserLogin',
  getInitialState: function() {
    return {
      errors: []
    };
  },

  componentDidMount: function() {
    $(SessionStore).on('login-error', function (e, userLoginErrors) {
      if(this.isMounted()) this.setState({ errors: userLoginErrors.errors })
    }.bind(this));
  },

  render: function () {
    var errors = [];
    var fomrOptions = {
      onSubmit: this.userLogin,
      submit: {value: "Login"}
    }
    return (
      React.DOM.nav({id: "user-login"},
        React.DOM.br(null), React.DOM.p(null, "Login"),
        FormFor({object: SessionStore.new(), options: fomrOptions, errors: this.state.errors})
      )
    )
  },

  userLogin: function (data) {
    SessionActions.createSession(data);
  }
});

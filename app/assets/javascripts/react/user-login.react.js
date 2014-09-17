/** @jsx React.DOM */
//= require react

var UserLogin = React.createClass({displayName: 'UserLogin',
  render: function () {
    return (
      React.DOM.nav({id: "user-login"}, 
        React.DOM.p(null, "Login"), 
        React.DOM.form({id: "user-login-form", onSubmit: "this.userLogin"}, 
          React.DOM.input({ref: "email", placeholder: "example@example.com", type: "email"}), 
          React.DOM.input({ref: "password", placeholder: "password", type: "password", maxLength: "30"}), 
          React.DOM.input({type: "submit", value: "Login"})
        )
      )
    )
  },

  userLogin: function (e) {
    e.preventDefault();
    var formData = {};
    formData.user = {};
    Object.keys(this.refs).forEach(function (ref) {
      formData.user[ref] = this.refs[ref].getDOMNode().value;
    }.bind(this));
    SessionsStore.login(formData);
  }
});

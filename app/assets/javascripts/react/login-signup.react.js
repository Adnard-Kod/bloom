/**
 * @jsx React.DOM
 */
//= require react

var LoginSignup = React.createClass({displayName: 'LoginSignup',

  render: function() {
    return (
      React.DOM.div({className: "col-md-6 col-md-offset-3"},
      React.DOM.div({className: "login-signup-forms"},
        UserCreation(null),
        UserLogin(null)
      )
      )
    );
  }

});

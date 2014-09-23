/**
 * @jsx React.DOM
 */
//= require react

var LoginSignup = React.createClass({displayName: 'LoginSignup',

  render: function() {
    return (
      React.DOM.div({className: "login-signup-forms"}, 
        UserCreation(null), 
        UserLogin(null)
      )
    );
  }

});

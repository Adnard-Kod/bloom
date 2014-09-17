/** @jsx React.DOM */
//= require react
//= require react/user-creation.react
//= require react/user-login.react

var Blooming = React.createClass({displayName: 'Blooming',
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.h1(null, "Blooming Spoon"), 
        UserCreation(null), 
        UserLogin(null)
      )
    )
  }
})

$(document).ready(function() {
  React.renderComponent(Blooming(null), $('#blooming')[0]);
});

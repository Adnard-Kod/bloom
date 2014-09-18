/** @jsx React.DOM */
//= require react
//= require react/user-creation.react
//= require react/user-login.react
//= require react/nav.react

var Blooming = React.createClass({displayName: 'Blooming',
  render: function() {
    return (
      Nav(null )
    )
  }
})

$(document).ready(function() {
  React.renderComponent(Blooming(null ), $('nav')[0]);
});

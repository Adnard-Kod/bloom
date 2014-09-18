/** @jsx React.DOM */
//= require react
//= require react/user-creation.react
//= require react/user-login.react
//= require react/nav.react

var Blooming = React.createClass({
  render: function() {
    return (
      <Nav />
    )
  }
})

$(document).ready(function() {
  React.renderComponent(<Blooming />, $('nav')[0]);
});

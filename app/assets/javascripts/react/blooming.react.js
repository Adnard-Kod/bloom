/** @jsx React.DOM */
//= require react
var Blooming = React.createClass({displayName: 'Blooming',
  render: function() {
    return (
      React.DOM.h1(null, "Blooming Spoon")
    )
  }
})

$(document).ready(function() {
  React.renderComponent(Blooming(null ), $('body')[0]);
});

/** @jsx React.DOM */
//= require react
var Blooming = React.createClass({
  render: function() {
    return (
      <h1>Blooming Spoon</h1>
    )
  }
})

$(document).ready(function() {
  React.renderComponent(<Blooming />, $('body')[0]);
});

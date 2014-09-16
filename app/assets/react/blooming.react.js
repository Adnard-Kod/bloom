/** @jsx React.DOM */
//= require react
//= require react/user-creation.react

var Blooming = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Blooming Spoon</h1>
        <UserCreation />
      </div>
    )
  }
})

$(document).ready(function() {
  React.renderComponent(<Blooming />, $('body')[0]);
});

/** @jsx React.DOM */
//= require react
//= require react/user-creation.react
//= require react/user-login.react

var Blooming = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Blooming Spoon</h1>
        <UserCreation />
        <UserLogin />
      </div>
    )
  }
})

$(document).ready(function() {
  React.renderComponent(<Blooming />, $('#blooming')[0]);
});

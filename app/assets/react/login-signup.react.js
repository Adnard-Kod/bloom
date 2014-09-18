/**
 * @jsx React.DOM
 */
//= require react

var LoginSignup = React.createClass({

  render: function() {
    return (
      <div className="login-signup-forms">
        <UserCreation />
        <UserLogin />
      </div>
    );
  }

});

/**
 * @jsx React.DOM
 */
//= require react

var LoginSignup = React.createClass({

  render: function() {
    return (
      <div className="col-md-6 col-md-offset-3">
      <div className="login-signup-forms pre-scrollable">
        <UserCreation />
        <UserLogin />
      </div>
      </div>
    );
  }

});

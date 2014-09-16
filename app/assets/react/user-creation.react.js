/** @jsx React.DOM */
//= require react

var UserCreation = React.createClass({
  render: function () {
    return (
      <section id="user-signup-box">
        <p id="user-signup-title">Create An Account</p>
        <form id="user-form" onSubmit={this.createUser}>
          <input ref="first_name" placeholder="First Name" />
          <input ref="last_name" placeholder="Last Name" />
          <input ref="phone_number" placeholder="555-555-5555" />
          <input ref="email" placeholder="example@example.com" />
          <input ref="password" placeholder="password" type="password" maxlength="30" />
          <input ref="password_confirmation" placeholder="confirm password" type="password" maxlength="30" />
          <input type="submit" value="User" />
        </form>
      </section>
    )
  },

  createUser: function (e) {

  }
});

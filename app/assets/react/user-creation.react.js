/** @jsx React.DOM */
//= require react
//= require stores/user-store

var UserCreation = React.createClass({
  render: function () {
    return (
      <section id="user-signup-box">
        <p id="user-signup-title">Create An Account</p>
        <form id="user-form" onSubmit={this.createUser}>
          <input ref="first_name" placeholder="First Name" />
          <input ref="last_name" placeholder="Last Name" />
          <input ref="phone_number" placeholder="555-555-5555" />
          <input ref="email" placeholder="example@example.com" type="email" />
          <input ref="password" placeholder="password" type="password" maxLength="30" />
          <input ref="password_confirmation" placeholder="confirm password" type="password" maxLength="30" />
          <input type="submit" value="User" />
        </form>
      </section>
    )
  },

  createUser: function (e) {
    e.preventDefault();
    var formData = {};
    formData.user = {};
    Object.keys(this.refs).forEach(function (ref) {
      var value = this.refs[ref].getDOMNode().value;
      if(value) formData.user[ref] = value;
    }.bind(this));
    UserStore.create(formData);
  }
});

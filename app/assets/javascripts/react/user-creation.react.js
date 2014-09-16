/** @jsx React.DOM */
//= require react
//= require stores/user-store

var UserCreation = React.createClass({displayName: 'UserCreation',
  render: function () {
    return (
      React.DOM.section({id: "user-signup-box"}, 
        React.DOM.p({id: "user-signup-title"}, "Create An Account"), 
        React.DOM.form({id: "user-form", onSubmit: this.createUser}, 
          React.DOM.input({ref: "first_name", placeholder: "First Name"}), 
          React.DOM.input({ref: "last_name", placeholder: "Last Name"}), 
          React.DOM.input({ref: "phone_number", placeholder: "555-555-5555"}), 
          React.DOM.input({ref: "email", placeholder: "example@example.com", type: "email"}), 
          React.DOM.input({ref: "password", placeholder: "password", type: "password", maxLength: "30"}), 
          React.DOM.input({ref: "password_confirmation", placeholder: "confirm password", type: "password", maxLength: "30"}), 
          React.DOM.input({type: "submit", value: "User"})
        )
      )
    )
  },

  createUser: function (e) {
    e.preventDefault();
    var formData = {};
    Object.keys(this.refs).forEach(function (ref) {
      var value = this.refs[ref].getDOMNode().value;
      if(value) formData[ref] = value;
    }.bind(this));
    UserStore.create(formData);
  }
});

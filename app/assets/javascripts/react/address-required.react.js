/**
 * @jsx React.DOM
 */
//= require react

var AddressRequired = React.createClass({displayName: 'AddressRequired',
  render: function() {
    return (
      React.DOM.div({className: "alert alert-danger", role: "alert"}, "You must have an address associated with your account to purchase a subscription. Please create one in the form above.")
    );
  }
})

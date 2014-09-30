/**
 * @jsx React.DOM
 */
//= require react

var AddressRequired = React.createClass({displayName: 'AddressRequired',
  render: function() {
    return (
      React.DOM.div(null,
        React.DOM.h4(null, "You must have an address associated with your account to purchase a subscription. Please create one in the form above.")
      )
    );
  }
})

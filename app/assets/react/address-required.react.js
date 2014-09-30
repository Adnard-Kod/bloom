/**
 * @jsx React.DOM
 */
//= require react

var AddressRequired = React.createClass({
  render: function() {
    return (
      <div>
        <h4>You must have an address associated with your account to purchase a subscription. Please create one in the form above.</h4>
      </div>
    );
  }
})

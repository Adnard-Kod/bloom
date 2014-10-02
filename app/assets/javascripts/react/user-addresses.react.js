/** @jsx React.DOM */
//= require react
//= require react/user-address.react
//= require stores/address-store
//= require stores/session-store

var UserAddresses = React.createClass({displayName: 'UserAddresses',
  render: function() {
    var addresses = [];
    var name = this.props.name;
    var createAddress = this.props.addresses.length === 0 ? UserAddressForm(null) : undefined;
    this.props.addresses.forEach(function (addr) {
      addresses.push(UserAddress({name: this.props.name, key: addr.id, addr: addr}))
    }.bind(this));

    return (
      React.DOM.div({id: "user-address"},
        createAddress,
        addresses
      )
    );
  }
})

/** @jsx React.DOM */
//= require react
//= require react/user-address.react
//= require stores/address-store
//= require stores/session-store

var UserAddresses = React.createClass({displayName: 'UserAddresses',
  getInitialState: function() {
    return {
      addresses: AddressStore.addresses()
    };
  },

  componentDidMount: function() {
    AddressStore.addChangeEvent(function () {
      this.setState({
        addresses: AddressStore.addresses()
      });
    }.bind(this));
    AddressStore.getUserAddresses(SessionStore.currentUser);
  },
  render: function() {
    var addresses = [];
    this.state.addresses.forEach(function (addr) {
      addresses.push(UserAddress({key: addr.id, addr: addr}))
    });

    return (
      React.DOM.div({id: "user-address"},
        addresses
      )
    );
  }
})

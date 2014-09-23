/** @jsx React.DOM */
//= require react
//= require react/user-address.react
//= require stores/address-store

var UserAddresses = React.createClass({
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
    AddressStore.getUserAddress();
  },
  render: function() {
    var addresses = [];
    this.state.addresses.forEach(function (addr) {
      addresses.push(<UserAddress key={addr.id} addr={addr} />)
    });

    return (
      <div id="user-address">
        {addresses}
      </div>
    );
  }
})

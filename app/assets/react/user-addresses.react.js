/** @jsx React.DOM */
//= require react
//= require react/user-address.react
//= require stores/address-store
//= require stores/session-store

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
    AddressStore.getUserAddresses(SessionStore.currentUser);
  },
  render: function() {
    var addresses = [];
    var name = this.props.name;
    var createAddress = this.state.addresses.length === 0 ? <UserAddressForm /> : undefined;
    this.state.addresses.forEach(function (addr) {
      addresses.push(<UserAddress name={this.props.name} key={addr.id} addr={addr} />)
    }.bind(this));

    return (
      <div id="user-address">
        {createAddress}
        {addresses}
      </div>
    );
  }
})

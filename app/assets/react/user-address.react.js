/** @jsx React.DOM */
//= require react
//= require stores/address-store
//= require react/user-address-form.react
//= require actions/address-actions

var UserAddress = React.createClass({
  getInitialState: function() {
    return {
      editing: false,
    };
  },

  componentDidMount: function() {
    AddressStore.addChangeEvent(function () {
      if (this.isMounted()) this.setState({ editing: false });
    }.bind(this));
  },

  render: function () {
    var addr = this.props.addr;
    var editForm = this.state.editing ? <UserAddressForm address={addr} editing="true" /> : undefined;
    return (
      <div className="col-lg-4">
        <h3>Current Address</h3>
        <ul className="list-group">
          <li className="list-group-item">Name</li>
          <li className="list-group-item">{addr.street_address}</li>
          <li className="list-group-item">{addr.apartment_number}</li>
          <li className="list-group-item">{addr.city}, {addr.state}, {addr.zipcode}</li>
          <span><a href="#" onClick={this.edit}>Edit</a></span>
          <span><a href="#" onClick={this.delete}>Delete</a></span>
          {editForm}
        </ul>
      </div>
    )
  },

  edit: function (e) {
    e.preventDefault();
    this.setState({ editing: !this.state.editing });
  },

  delete: function(e) {
    e.preventDefault();
    AddressActions.destroyAddress(this.props.addr.id);
  }
})

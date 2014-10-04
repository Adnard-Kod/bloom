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

  getDefaultProps: function() {
    return {
      admin: false
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
    var deleteButton = this.props.admin ? <span><a href="#" onClick={this.delete}>Delete</a></span> : undefined;
    return (
      <div>
        <PageHeader title="Current Address" />
        <ul className="list-group">
          <li className="list-group-item">
            <p>{this.props.name}</p>
            <p>{addr.street_address}</p>
            <p>{addr.apartment_number}</p>
            <p>{addr.city} {addr.state} {addr.zipcode}</p>
          </li><br></br>
          <a className='btn btn-default' onClick={this.edit}>Edit</a>
          {deleteButton}
          {editForm}
        </ul>
      </div>

    )
  },

  edit: function (e) {
    e.preventDefault();
    if(this.isMounted()) this.setState({ editing: !this.state.editing });
  },

  delete: function(e) {
    e.preventDefault();
    AddressActions.destroyAddress(this.props.addr.id);
  }
})

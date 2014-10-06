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
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader title="Current Address" />
            <ul className="list-group">
              <li className="list-group-item">
                <p>{this.props.name}</p>
                <p>{addr.street_address}</p>
                <p>{addr.apartment_number}</p>
                <p>{addr.city} {addr.state} {addr.zipcode}</p>
              </li><br></br>
              <a className='btn btn-default edit-address' onClick={this.edit}>Edit</a>
              {this.renderDeleteButton()}
              {this.renderEditForm()}
            </ul>
          </div>
        </div>
      </div>
    )
  },
  renderEditForm: function() {
    if(this.state.editing) return(<UserAddressForm address={this.props.addr} errors={this.props.errors} editing={this.state.editing}/>);
  },
  renderDeleteButton: function() {
    if(this.props.admin) return(<span><a href="#" onClick={this.delete}>Delete</a></span>);
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

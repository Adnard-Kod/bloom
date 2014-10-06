/**
 * @jsx React.DOM
 */
//= require react
//= require react/form-builder/form-for.react
//= require stores/address-store
//= require actions/address-actions

var UserAddressForm = React.createClass({
  render: function () {
    var address = this.props.address || AddressStore.new();
    var formOptions = {
      name: "Address",
      onSubmit: this.handleSubmit,
      delivery_instructions: {
        type: 'textarea'
      }
    };

    return (
      <div>
        <FormFor object={address} options={formOptions} errors={this.props.errors} />
      </div>
    );
  },

  handleSubmit: function (data) {
    if (this.props.editing) {
      AddressActions.updateAddress(data)
    } else {
      AddressActions.createAddress(data)
    }
  }
})

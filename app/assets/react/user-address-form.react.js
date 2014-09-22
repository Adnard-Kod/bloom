/**
 * @jsx React.DOM
 */
//= require react
//= require react/form-builder/form-for.react
//= require stores/address-store
//= require actions/address-actions

var UserAddressForm = React.createClass({
  getInitialState: function() {
    return {
      errors: []
    };
  },

  componentDidMount: function() {
    AddressStore.addFailToTakeAction(function (e, data) {
      if (this.isMounted()) this.setState({ errors: data });
    }.bind(this));
    AddressStore.addChangeEvent(function () {
      if (this.isMounted()) this.setState({ errors: [] });
    }.bind(this));
  },

  render: function () {
    var address = this.props.address || AddressStore.new();
    var formOptions = {
      name: "Address",
      onSubmit: this.handleSubmit
    };

    return (
      <div>
        <FormFor object={address} options={formOptions} errors={this.state.errors} />
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

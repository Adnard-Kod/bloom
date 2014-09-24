/** @jsx React.DOM */
//= require react
//= require stores/address-store
//= require react/user-address-form.react
//= require actions/address-actions

var UserAddress = React.createClass({displayName: 'UserAddress',
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
    var editForm = this.state.editing ? UserAddressForm({address: addr, editing: "true"}) : undefined;
    return (
      React.DOM.div({className: "col-lg-4"},
        React.DOM.h3(null, "Current Address"),
        React.DOM.ul({className: "list-group"},
          React.DOM.li({className: "list-group-item"}, "Name"),
          React.DOM.li({className: "list-group-item"}, addr.street_address),
          React.DOM.li({className: "list-group-item"}, addr.apartment_number),
          React.DOM.li({className: "list-group-item"}, addr.city, ", ", addr.state, ", ", addr.zipcode),
          React.DOM.span(null, React.DOM.a({href: "#", onClick: this.edit}, "Edit")),
          React.DOM.span(null, React.DOM.a({href: "#", onClick: this.delete}, "Delete")),
          editForm
        )
      )
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

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
    var editForm = this.state.editing ? UserAddressForm({address: addr, editing: "true"}) : undefined;
    var deleteButton = this.props.admin ? React.DOM.span(null, React.DOM.a({href: "#", onClick: this.delete}, "Delete")) : undefined;
    return (
      React.DOM.div(null,
        PageHeader({title: "Current Address"}),
        React.DOM.ul({className: "list-group"},
          React.DOM.li({className: "list-group-item"},
            React.DOM.p(null, this.props.name),
            React.DOM.p(null, addr.street_address),
            React.DOM.p(null, addr.apartment_number),
            React.DOM.p(null, addr.city, " ", addr.state, " ", addr.zipcode)
          ), React.DOM.br(null),
          React.DOM.a({className: "btn btn-default", onClick: this.edit}, "Edit"),
          deleteButton,
          editForm
        )
      )

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

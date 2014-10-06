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
    return (
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            PageHeader({title: "Current Address"}),
            React.DOM.ul({className: "list-group"},
              React.DOM.li({className: "list-group-item"},
                React.DOM.p(null, this.props.name),
                React.DOM.p(null, addr.street_address),
                React.DOM.p(null, addr.apartment_number),
                React.DOM.p(null, addr.city, " ", addr.state, " ", addr.zipcode)
              ), React.DOM.br(null),
              React.DOM.a({className: "btn btn-default edit-address", onClick: this.edit}, "Edit"),
              this.renderDeleteButton(),
              this.renderEditForm()
            )
          )
        )
      )
    )
  },
  renderEditForm: function() {
    if(this.state.editing) return(UserAddressForm({address: this.props.addr, errors: this.props.errors, editing: this.state.editing}));
  },
  renderDeleteButton: function() {
    if(this.props.admin) return(React.DOM.span(null, React.DOM.a({href: "#", onClick: this.delete}, "Delete")));
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

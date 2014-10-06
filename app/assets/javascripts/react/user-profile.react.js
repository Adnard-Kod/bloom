/**
 * @jsx React.DOM
 */
//= require react
//= require react/memberships.react
//= require stores/subscription-store
//= require stores/promotion-store
//= require react/address-required.react
//= require stores/payment-store
//= require react/user-addresses.react
//= require react/user-membership-form.react
//= require react/page-header.react
//= require react/alert.react
//= require actions/membership-actions
//= require react/membership-hold-info.react

var UserProfile = React.createClass({displayName: 'UserProfile',
  getInitialState: function() {
    return {
      memberships: [],
      user: {},
      alert: {},
      addresses: [],
      errors: [],
      subscriptions: SubscriptionStore.subscriptions()
    };
  },

  componentDidMount: function() {
    this.setUser();
    SubscriptionStore.addChangeEvent(function () {
      if (this.isMounted()) this.setState({ subscriptions: SubscriptionStore.subscriptions() });
    }.bind(this));

    AddressStore.addChangeEvent(function() {
      if (this.isMounted()) this.setState({addresses: AddressStore.addresses(), alert: {}, errors: []})
    }.bind(this))
    AddressStore.addFailToTakeAction(function (e, data) {
      if (this.isMounted()) this.setState({ errors: data });
    }.bind(this));
    PromotionStore.addFailToTakeAction(function() {
      if (this.isMounted()) this.setState({alert: {message: "Invalid Code", danger: true}})
    }.bind(this))
    PromotionStore.addChangeEvent(function(e, data) {
      var discount = data.discount_amount;
      if(data.discount_type === '$') {
        discount = data.discount_type + '' + discount;
      } else {
        discount =  discount + '' + data.discount_type;
      }
      if (this.isMounted()) this.setState({alert: {message: "You saved " + discount, danger: false }})
    }.bind(this))
  },
  render: function() {
    return (
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            React.DOM.div({className: "user-profile"},
              this.renderAlert(),
              this.renderUserAddresses(),
              this.renderMemberships(),
              this.renderOnHoldMembershipInfo(),
              this.renderOrderHistory()
            )
          )
        )
      )
    );
  },
  renderMemberships: function() {
    if(this.hasAddr() && !this.hasActiveMembership()) {
      return this.renderMembershipForm()
    } else {
      return this.renderCurrentMembership()
    }
  },
  renderAlert: function() {
    if(this.state.alert && this.state.alert.message) return(Alert({danger: this.state.alert.danger, message: this.state.alert.message}))
  },
  hasAddr: function() {
    return this.state.addresses && this.state.addresses.length > 0;
  },
  renderUserAddresses: function() {
    return(UserAddresses({addresses: this.state.addresses, name: this.fullName(), errors: this.state.errors}));
  },

  hasActiveMembership: function() {
    return this.state.user.active_memberships && this.state.user.active_memberships.length > 0;
  },

  hasOnHoldMembership: function() {
    return this.state.user.on_hold_memberships && this.state.user.on_hold_memberships.length > 0;
  },

  renderMembershipForm: function() {
    return (UserMembershipForm({subscriptions: this.state.subscriptions, hasAddr: this.hasAddr(), errors: this.state.errors}));
  },
  renderCurrentMembership: function() {
    if(this.hasActiveMembership()) {
      return (Membership({membership: this.state.user.active_memberships[0], showHoldButton: !this.hasHoldWeeksRemaining()}));
    } else if(this.hasOnHoldMembership()) {
      return(Membership({membership: this.state.user.on_hold_memberships[0], showHoldButton: !this.hasHoldWeeksRemaining()}));
    }
  },
  renderOrderHistory: function() {
    if(this.state.memberships.length > 0) return(Memberships({memberships: this.state.memberships}));
  },
  fullName: function(first, last) {
    var firstName = this.state.user.first_name || '';
    var lastName = this.state.user.last_name || '';
    return firstName + ' ' + lastName;
  },

  setUser: function() {
    UserStore.addChangeEvent(function() {
      var user = UserStore.currentUser();
      if (this.isMounted()) {
        this.setState({
          user: user,
          addresses: user.addresses,
          memberships: user.expired_memberships
        });
      }
      AddressStore.setAddresses(this.state.user.addresses)
    }.bind(this));

    if(this.props.admin && this.props.userId) {
      UserStore.getCurrentUserInfo(this.props.userId);
    } else {
      UserStore.setCurrentUser(SessionStore.currentUser);
    }
  },

  alertMessage: function(user) {
    if(user.addresses.length === 0) return {message: "You must have an address associated with your account to purchase a subscription. Please create one in the form below.", danger: true}
  },

  renderOnHoldMembershipInfo: function() {
    if(this.hasOnHoldMembership() || this.hasHoldWeeksRemaining()) {
      var user = this.state.user
      var membership = user.active_memberships.length === 0 ? user.on_hold_memberships[0] : user.active_memberships[0];
      return (MembershipHoldInfo({membership: membership}));
    }
  },

  hasHoldWeeksRemaining: function() {
    if(this.hasActiveMembership()) {
      return this.state.user.active_memberships[0].hold_weeks_remaining !== null
    } else if(this.hasOnHoldMembership()) {
      return this.state.user.on_hold_memberships[0].hold_weeks_remaining !== null;
    }
  }
});

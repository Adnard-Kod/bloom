/**
 * @jsx React.DOM
 */
//= require react
//= require react/memberships.react
//= require stores/subscription-store
//= require stores/promotion-store
//= require react/subscriptions.react
//= require react/address-required.react
//= require stores/payment-store
//= require react/user-addresses.react
//= require react/user-membership-form.react
//= require react/page-header.react
//= require react/user-promotion-form.react
//= require react/alert.react
//= require actions/membership-actions
//= require react/membership-hold-info.react

var UserProfile = React.createClass({
  getInitialState: function() {
    return {
      memberships: [],
      user: {},
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
      if (this.isMounted()) this.setState({addresses: AddressStore.addresses()})
    }.bind(this))

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="user-profile">
              {this.renderUserAddresses()}
              {this.renderSubscription()}
              {this.renderAlert()}
              {this.renderPromotionForm()}
              {this.renderMembershipForm()}
              {this.renderCurrentMembership()}
              {this.renderOnHoldMembershipInfo()}
              <Memberships memberships={this.state.memberships}/>
            </div>
          </div>
        </div>
      </div>
    );
  },
  renderAlert: function() {
    if(this.state.alert) return(<Alert danger={this.state.alert.danger} message={this.state.alert.message} />)
  },
  hasAddr: function() {
    return this.state.addresses && this.state.addresses.length > 0;
  },
  renderUserAddresses: function() {
    return(<UserAddresses addresses={this.state.addresses} name={this.fullName()}/>);
  },
  renderSubscription: function() {
    if(!this.hasActiveMembership() && !this.hasOnHoldMembership()) return (<Subscriptions />);
  },

  hasActiveMembership: function() {
    return this.state.user.active_memberships && this.state.user.active_memberships.length > 0;
  },

  hasOnHoldMembership: function() {
    return this.state.user.on_hold_memberships && this.state.user.on_hold_memberships.length > 0;
  },

  renderMembershipForm: function() {
    if(!this.hasActiveMembership() && !this.hasOnHoldMembership()) return (<UserMembershipForm subscriptions={this.state.subscriptions} hasAddr={this.hasAddr()} errors={this.state.errors}/>);
  },

  renderPromotionForm: function() {
    if(!this.hasActiveMembership()) return (<UserPromotionForm errors={this.state.errors}/>);
  },

  renderCurrentMembership: function() {
    if(this.hasActiveMembership()) {
      return (<Membership membership={this.state.user.active_memberships[0]} showHoldButton={!this.hasHoldWeeksRemaining()} />);
    } else if(this.hasOnHoldMembership()) {
      return(<Membership membership={this.state.user.on_hold_memberships[0]} showHoldButton={!this.hasHoldWeeksRemaining()} />);
    }
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

  renderOnHoldMembershipInfo: function() {
    if(this.hasOnHoldMembership() || this.hasHoldWeeksRemaining()) {
      var user = this.state.user
      var membership = user.active_memberships.length === 0 ? user.on_hold_memberships[0] : user.active_memberships[0];
      return (<MembershipHoldInfo membership={membership} />);
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

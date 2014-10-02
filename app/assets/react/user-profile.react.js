/**
 * @jsx React.DOM
 */
//= require react
//= require react/memberships.react
//= require stores/subscription-store
//= require react/subscriptions.react
//= require react/address-required.react
//= require stores/payment-store
//= require react/user-addresses.react
//= require react/user-membership-form.react
//= require react/page-header.react
//= require react/user-promotion-form.react
var UserProfile = React.createClass({
  getInitialState: function() {
    return {
      memberships: [],
      user: SessionStore.currentUser,
      addresses: [],
      errors: [],
      subscriptions: SubscriptionStore.subscriptions()
    };
  },

  componentDidMount: function() {
    SubscriptionStore.addChangeEvent(function () {
      if (this.isMounted()) this.setState({ subscriptions: SubscriptionStore.subscriptions() });
    }.bind(this));

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
    var userId = this.props.admin && this.props.userId ? this.props.userId : SessionStore.currentUser.id;
    UserStore.getCurrentUserInfo(userId);

    AddressStore.addChangeEvent(function() {
      if (this.isMounted()) this.setState({addresses: AddressStore.addresses()})
    }.bind(this))
  },
  render: function() {
    return (
      <div className="user-profile">
        {this.renderUserAddresses()}
        {this.renderSubscription()}
        {this.renderMembershipForm()}
        {this.renderPromotionForm()}
        {this.renderCurrentMembership()}
        <Memberships memberships={this.state.memberships}/>
      </div>
    );
  },

  hasAddr: function() {
    return this.state.addresses && this.state.addresses.length > 0;
  },
  renderUserAddresses: function() {
    return(<UserAddresses addresses={this.state.addresses} name={this.fullName()}/>);
  },
  renderSubscription: function() {
    if(!this.hasActiveMembership()) return (<Subscriptions />);
  },

  hasActiveMembership: function() {
    return this.state.user.active_memberships && this.state.user.active_memberships.length > 0;
  },

  renderMembershipForm: function() {
    if(!this.hasActiveMembership()) return (<UserMembershipForm subscriptions={this.state.subscriptions} hasAddr={this.hasAddr()} errors={this.state.errors}/>);
  },

  renderPromotionForm: function() {
    return (<UserPromotionForm errors={this.state.errors}/>);
  },

  renderCurrentMembership: function() {
    if(this.hasActiveMembership()) return (<Membership membership={this.state.user.active_memberships[0]} />);
  },

  fullName: function(first, last) {
    var firstName = this.state.user.first_name || '';
    var lastName = this.state.user.last_name || '';
    return firstName + ' ' + lastName;
  }

});

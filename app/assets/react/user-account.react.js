/**
 * @jsx React.DOM
 */
//= require react
//= require stores/user-store
//= require stores/payment-store
//= require stores/session-store
//= require react/user-membership-options.react
//= require react/subscriptions.react
//= require react/membership.react
//= require react/user-addresses.react

var UserAccount = React.createClass({
  getInitialState: function() {
    return {
      user: UserStore.currentUser()
    };
  },

  componentDidMount: function() {
    UserStore.addChangeEvent(function() {
      this.setState({
        user: UserStore.currentUser()
      });
    }.bind(this));
    UserStore.getCurrentUserInfo(SessionStore.currentUser);
  },

  render: function() {
    return (
      <div>
        <UserAddresses name={this.fullName()}/>
        {this.renderSubscription()}
        {this.renderMembershipOptions()}
        {this.renderCurrentMembership()}
      </div>
    )
  },

  hasAddr: function() {
    return this.state.user.addresses && this.state.user.addresses.length > 0;
  },

  renderSubscription: function() {
    if(!this.hasActiveMembership()) return (<Subscriptions />);
  },

  hasActiveMembership: function() {
    return this.state.user.active_memberships && this.state.user.active_memberships.length > 0;
  },

  renderMembershipOptions: function() {
    if(!this.hasActiveMembership()) return (<UserMembershipOptions hasAddr={this.hasAddr()}/>);
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

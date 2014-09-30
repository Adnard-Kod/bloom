/**
 * @jsx React.DOM
 */
//= require react
//= require stores/user-store
//= require stores/payment-store
//= require stores/session-store
//= require react/user-membership-options.react
//= require react/subscriptions.react
//= require react/user-active-membership.react

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
    var user = this.state.user;
    var subscriptions = 'active_memberships' in user && user.active_memberships.length > 0 ? undefined : <Subscriptions />;
    var userMembershipOptions = 'active_memberships' in user && user.active_memberships.length === 0 ? <UserMembershipOptions /> : undefined;
    var userActiveMembership = 'active_memberships' in user && user.active_memberships.length > 0 ? <UserActiveMembership membership={user.active_memberships[0]} /> : undefined;
    return (
      <div>
        {subscriptions}
        {userMembershipOptions}
        {userActiveMembership}
      </div>
    )
  }
});

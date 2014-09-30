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
//= require react/user-addresses.react

var UserAccount = React.createClass({displayName: 'UserAccount',
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
    var firstName = 'first_name' in user ? user.first_name : '';
    var lastName = 'last_name' in user ? user.last_name : '';
    var subscriptions = 'active_memberships' in user && user.active_memberships.length > 0 ? undefined : Subscriptions(null);
    var userMembershipOptions = 'active_memberships' in user && user.active_memberships.length === 0 ? UserMembershipOptions(null) : undefined;
    var userActiveMembership = 'active_memberships' in user && user.active_memberships.length > 0 ? UserActiveMembership({membership: user.active_memberships[0]}) : undefined;
    return (
      React.DOM.div(null,
        UserAddresses({name: firstName + ' ' + lastName}),
        subscriptions,
        userMembershipOptions,
        userActiveMembership
      )
    )
  }
});

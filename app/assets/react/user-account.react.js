/**
 * @jsx React.DOM
 */
//= require react
//= require stores/user-store
//= require stores/payment-store
//= require stores/session-store
//= require react/user-membership-options.react
//= require react/subscriptions.react

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
        <Subscriptions />
        <UserMembershipOptions />
      </div>
    )
  }
});

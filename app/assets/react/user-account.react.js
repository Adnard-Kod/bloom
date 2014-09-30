/**
 * @jsx React.DOM
 */
//= require react
//= require stores/user-store
//= require stores/session-store

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
      <div />
    )
  }
});

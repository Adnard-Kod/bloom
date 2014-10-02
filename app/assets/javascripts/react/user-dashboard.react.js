/** @jsx React.DOM */
//= require react
//= require react/current-menu.react
//= require react/active-add-ons.react
var UserDashboard = React.createClass({displayName: 'UserDashboard',
  render: function () {
    return (
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          this.renderMembershipAlert(),
          React.DOM.div({className: "col-lg-12"},
            CurrentMenu(null),
            this.renderAddOns()
          )
        )
      )
    )
  },
  renderAddOns: function() {
    if(this.userHasActiveMembership()) return(ActiveAddOns(null));
  },
  renderMembershipAlert: function() {
    if(!this.userHasActiveMembership())
      return(Alert({danger: true, message: "You don't have an active membership. Please visit My Account and pay for a new membership."}));

  },
  userHasActiveMembership: function() {
    return SessionStore.currentUser.active_memberships.length > 0;
  }
});

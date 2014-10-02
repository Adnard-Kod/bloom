/** @jsx React.DOM */
//= require react
//= require react/current-menu.react
//= require react/active-add-ons.react
//= require react/page-header.react

var UserDashboard = React.createClass({
  render: function () {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.renderMembershipAlert()}
          <div className="col-lg-12">
            <CurrentMenu />
            {this.renderAddOns()}
          </div>
        </div>
      </div>
    )
  },
  renderAddOns: function() {
    if(this.userHasActiveMembership()) return(<ActiveAddOns />);
  },
  renderMembershipAlert: function() {
    if(!this.userHasActiveMembership())
      return(<Alert danger={true} message="You don't have an active membership. Please visit My Account and pay for a new membership." />);

  },
  userHasActiveMembership: function() {
    return SessionStore.currentUser.active_memberships.length > 0;
  }
});

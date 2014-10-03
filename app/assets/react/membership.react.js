/**
 * @jsx React.DOM
 */
//= require react
//= require react/page-header.react

var Membership = React.createClass({
  getDefaultProps: function() {
    return {
      admin: false
    };
  },

  render: function() {
    var mem = this.props.membership;
    return (
      <div>
        {this.renderActiveMembershipHeader()}
        {this.renderOnHoldMembershipHeader()}
        <ul className="list-group">
          {this.renderUserId()}
          <li className="list-group-item">
            <p>Weeks Remaining: {mem.weeks_remaining}</p>
            <p>Meals Remaining: {mem.meals_remaining}</p>
            <p>Meals per Week: {mem.meals_per_week}</p>
            <p>Start Date: {mem.start_date}</p>
            <p>End Date: {mem.end_date}</p>
            <p>Status: {mem.status}</p>
          </li>
        </ul>
        {this.renderOnHoldButton()}
        {this.renderRemoveMembershipHold()}
      </div>
    );
  },

  membershipActive: function() {
    return this.props.membership.status && this.props.membership.status === 'active';
  },

  membershipOnHold: function() {
    return this.props.membership.status && this.props.membership.status === 'on_hold';
  },

  renderActiveMembershipHeader: function() {
    if(this.membershipActive() && !this.props.admin) {
      return (<PageHeader title="Active Membership Details" />);
    }
  },

  renderOnHoldMembershipHeader: function() {
    if(this.membershipOnHold() && !this.props.admin) {
      return (<h4>On Hold Membership Details</h4>);
    }
  },

  renderOnHoldButton: function() {
    var activeId = 'active-' + this.props.membership.id;
    if(this.membershipActive())
      return (<a className='btn btn-default' id={activeId} onClick={this.props.putOnHold}>Put Membership On Hold</a>);
  },

  renderRemoveMembershipHold: function() {
    if(this.membershipOnHold()) {
      return (<a className='btn btn-default' onClick={this.removeHold}>Remove Membership Hold</a>);
    }
  },

  renderUserId: function() {
    if(this.props.admin) return (<li className="list-group-item">User Id: {this.props.membership.id}</li>);
  }
});

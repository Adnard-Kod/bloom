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
      </div>
    );
  },

  membershipActive: function() {
    return this.props.membership.status && this.props.membership.status === 'active';
  },

  renderActiveMembershipHeader: function() {
    if(this.membershipActive() && !this.props.admin) {
      return (<PageHeader title="Active Membership Details" />);
    }
  },

  renderUserId: function() {
    if(this.props.admin) return (<li className="list-group-item">User Id: {this.props.membership.id}</li>);
  }
});

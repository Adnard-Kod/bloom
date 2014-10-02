/**
 * @jsx React.DOM
 */
//= require react

var Membership = React.createClass({
  render: function() {
    var mem = this.props.membership;
    var activeMembershipDetails = mem.status === 'active' ? <h3>Active Membership Details</h3> : undefined;
    return (
      <div>
        {activeMembershipDetails}
          <li className="list-group-item">Weeks Remaining: {mem.weeks_remaining}</li>
          <li className="list-group-item">Meals Remaining: {mem.meals_remaining}</li>
          <li className="list-group-item">Meals per Week: {mem.meals_per_week}</li>
          <li className="list-group-item">Start Date: {mem.start_date}</li>
          <li className="list-group-item">End Date: {mem.end_date}</li>
          <li className="list-group-item">Status: {mem.status}</li>
      </div>
    );
  }
});

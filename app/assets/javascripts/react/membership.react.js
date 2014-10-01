/**
 * @jsx React.DOM
 */
//= require react

var Membership = React.createClass({displayName: 'Membership',
  render: function() {
    var mem = this.props.membership;
    var activeMembershipDetails = mem.status === 'active' ? React.DOM.h4(null, "Active Membership Details") : undefined;
    return (
      React.DOM.div(null,
        activeMembershipDetails,
        React.DOM.ul(null,
          React.DOM.li({className: "list-group-item"}, "Weeks Remaining: ", mem.weeks_remaining),
          React.DOM.li({className: "list-group-item"}, "Meals Remaining: ", mem.meals_remaining),
          React.DOM.li({className: "list-group-item"}, "Meals per Week: ", mem.meals_per_week),
          React.DOM.li({className: "list-group-item"}, "Start Date: ", mem.start_date),
          React.DOM.li({className: "list-group-item"}, "End Date: ", mem.end_date),
          React.DOM.li({className: "list-group-item"}, "Status: ", mem.status)
        )
      )
    );
  }
});

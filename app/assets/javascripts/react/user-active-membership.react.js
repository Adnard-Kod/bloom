/**
 * @jsx React.DOM
 */
//= require react

var UserActiveMembership = React.createClass({displayName: 'UserActiveMembership',
  render: function() {
    var mem = this.props.membership;
    return (
      React.DOM.div(null,
        React.DOM.h4(null, "Active Membership Details"),
        React.DOM.ul(null,
          React.DOM.li({className: "list-group-item"}, "Weeks Remaining: ", mem.weeks_remaining),
          React.DOM.li({className: "list-group-item"}, "Meals Remaining: ", mem.meals_remaining),
          React.DOM.li({className: "list-group-item"}, "Meals per Week: ", mem.meals_per_week),
          React.DOM.li({className: "list-group-item"}, "Start Date: ", mem.meals_per_week),
          React.DOM.li({className: "list-group-item"}, "End Date: ", mem.end_date),
          React.DOM.li({className: "list-group-item"}, "Status: ", mem.status)
        )
      )
    );
  }
});

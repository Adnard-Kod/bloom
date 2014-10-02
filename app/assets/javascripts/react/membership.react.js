/**
 * @jsx React.DOM
 */
//= require react

var Membership = React.createClass({displayName: 'Membership',
  getDefaultProps: function() {
    return {
      admin: false
    };
  },

  render: function() {
    var mem = this.props.membership;
    return (
      React.DOM.div(null,
        this.renderActiveMembershipHeader(),
        React.DOM.ul(null,
          this.renderUserId(),
          React.DOM.li({className: "list-group-item"}, "Weeks Remaining: ", mem.weeks_remaining),
          React.DOM.li({className: "list-group-item"}, "Meals Remaining: ", mem.meals_remaining),
          React.DOM.li({className: "list-group-item"}, "Meals per Week: ", mem.meals_per_week),
          React.DOM.li({className: "list-group-item"}, "Start Date: ", mem.start_date),
          React.DOM.li({className: "list-group-item"}, "End Date: ", mem.end_date),
          React.DOM.li({className: "list-group-item"}, "Status: ", mem.status)
        )
      )
    );
  },

  membershipActive: function() {
    return this.props.membership.status && this.props.membership.status === 'active';
  },

  renderActiveMembershipHeader: function() {
    if(this.membershipActive() && !this.props.admin) {
      return (React.DOM.h4(null, "Active Membership Details"));
    }
  },

  renderUserId: function() {
    if(this.props.admin) return (React.DOM.li({className: "list-group-item"}, "User Id: ", this.props.membership.id));
  }
});

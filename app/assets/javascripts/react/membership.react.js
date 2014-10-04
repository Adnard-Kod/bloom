/**
 * @jsx React.DOM
 */
//= require react
//= require react/page-header.react

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
        React.DOM.ul({className: "list-group"},
          this.renderUserId(),
          React.DOM.li({className: "list-group-item"},
            React.DOM.p(null, "Weeks Remaining: ", mem.weeks_remaining),
            React.DOM.p(null, "Meals Remaining: ", mem.meals_remaining),
            React.DOM.p(null, "Meals per Week: ", mem.meals_per_week),
            React.DOM.p(null, "Start Date: ", mem.start_date),
            React.DOM.p(null, "End Date: ", mem.end_date),
            React.DOM.p(null, "Status: ", mem.status)
          )
        )
      )
    );
  },

  membershipActive: function() {
    return this.props.membership.status && this.props.membership.status === 'active';
  },

  renderActiveMembershipHeader: function() {
    if(this.membershipActive() && !this.props.admin) {
      return (PageHeader({title: "Active Membership Details"}));
    }
  },

  renderUserId: function() {
    if(this.props.admin) return (React.DOM.li({className: "list-group-item"}, "User Id: ", this.props.membership.id));
  }
});

/**
 * @jsx React.DOM
 */
//= require react

var MembershipHoldInfo = React.createClass({displayName: 'MembershipHoldInfo',
  render: function() {
    var mem = this.props.membership;
    return (
      React.DOM.div(null,
        React.DOM.h4(null, "Membership Hold Details"),
        React.DOM.ul({className: "list-group"},
          React.DOM.li({className: "list-group-item"}, "Membership hold starts: ", mem.hold_start),
          React.DOM.li({className: "list-group-item"}, "There are ", mem.hold_weeks_remaining, " weeks remaining on your membership hold"),
          React.DOM.li({className: "list-group-item"}, "Your membership hold ends on: ", mem.hold_end)
        )
      )
    );
  }
});

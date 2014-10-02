/**
 * @jsx React.DOM
 */
//= require react
//= require stores/membership-store
//= require react/membership.react

var Memberships = React.createClass({displayName: 'Memberships',
  render: function() {
    var memberships = [];
    this.props.memberships.forEach(function(mem) {
      memberships.push(Membership({membership: mem, key: mem.id}));
    });
    return (
      React.DOM.div(null,
        React.DOM.h3(null, "Order History"),
        React.DOM.ul({className: "list-group"},
          memberships
        )
      )
    );
  }
})

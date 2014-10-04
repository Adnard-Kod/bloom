/**
 * @jsx React.DOM
 */
//= require react
//= require stores/membership-store
//= require react/membership.react
//= require react/page-header.react


var Memberships = React.createClass({displayName: 'Memberships',
  render: function() {
    var memberships = [];
    this.props.memberships.forEach(function(mem) {
      memberships.push(Membership({membership: mem, key: mem.id}));
    });
    return (
      React.DOM.div(null,
        PageHeader({title: "Order History"}),
        React.DOM.ul({className: "list-group"},
          React.DOM.li({className: "list-group-item"},
            memberships
          )
        )
      )
    );
  }
})

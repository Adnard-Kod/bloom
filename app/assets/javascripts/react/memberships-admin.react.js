/**
 * @jsx React.DOM
 */
//= require react
//= require stores/membership-store
//= require react/membership.react
//= require react/tabs/tablist.react

var MembershipsAdmin = React.createClass({displayName: 'MembershipsAdmin',
  getInitialState: function() {
    return {
      memberships: MembershipStore.memberships()
    };
  },

  getDefaultProps: function() {
    return {
      admin: true
    };
  },

  componentDidMount: function() {
    MembershipStore.addChangeEvent(function() {
      this.setState({
        memberships: MembershipStore.memberships()
      })
    }.bind(this));
    MembershipStore.getUserMembershipsAdmin();
  },

  render: function() {
    var tabs = [ { href: 'current', name: 'Active' },
                 { href: 'on-hold', name: 'On Hold' },
                 { href: 'expired', name: 'Expired'}];
    return (
      React.DOM.div(null,
        React.DOM.h4(null, "User Memberships"),
        Tablist({tabs: tabs}),
        React.DOM.div({className: "tab-content"},
          React.DOM.div({className: "tab-pane active", id: "current"}, this.renderActiveMemberships()),
          React.DOM.div({className: "tab-pane", id: "on-hold"}, this.renderOnHoldMemberships()),
          React.DOM.div({className: "tab-pane", id: "expired"}, this.renderExpiredMemberships())
        )
      )
    );
  },

  renderActiveMemberships: function() {
    return this.renderMembershipSection(this.state.memberships.active);
  },

  renderOnHoldMemberships: function() {
    return this.renderMembershipSection(this.state.memberships.on_hold);
  },

  renderExpiredMemberships: function() {
    return this.renderMembershipSection(this.state.memberships.expired);
  },

  renderMembershipSection: function(memberships) {
    var membershipComponents = [];
    if(memberships) {
      memberships.forEach(function(membership) {
        membershipComponents.push(Membership({membership: membership, admin: this.props.admin, key: membership.id}))
      }.bind(this))
    }
    return membershipComponents;
  }
});

/**
 * @jsx React.DOM
 */
//= require react
//= require stores/membership-store
//= require react/membership.react
//= require react/tabs/togglable-tabs.react

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
      if(this.isMounted()) {
        this.setState({
          memberships: MembershipStore.memberships()
        })
      }
    }.bind(this));
    MembershipStore.getUserMembershipsAdmin();
  },

  render: function() {
    var tabs = [ { href: 'current', name: 'Active' },
                 { href: 'on-hold', name: 'On Hold' },
                 { href: 'expired', name: 'Expired'}];
    var tabContents = [ { id: 'current', content: this.renderActiveMemberships() },
                        { id: 'on-hold', content: this.renderOnHoldMemberships() },
                        { id: 'expired', content: this.renderExpiredMemberships() }];
    return (
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            PageHeader({title: "User Memberships"})
          )
        ),
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
          TogglableTabs({tabs: tabs, tabContents: tabContents})
          )
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

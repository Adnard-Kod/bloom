/**
 * @jsx React.DOM
 */
//= require react
//= require stores/membership-store
//= require react/membership.react
//= require react/tabs/tablist.react
//= require react/tabs/tab-contents.react

var MembershipsAdmin = React.createClass({
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
    var tabContents = [ { id: 'current', content: this.renderActiveMemberships() },
                        { id: 'on-hold', content: this.renderOnHoldMemberships() },
                        { id: 'expired', content: this.renderExpiredMemberships() }];
    return (
      <div>
        <h4>User Memberships</h4>
        <Tablist tabs={tabs} />
        <TabContents tabContents={tabContents} />
      </div>
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
        membershipComponents.push(<Membership membership={membership} admin={this.props.admin} key={membership.id} />)
      }.bind(this))
    }
    return membershipComponents;
  }
});

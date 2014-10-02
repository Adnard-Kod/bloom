/**
 * @jsx React.DOM
 */
//= require react
//= require stores/membership-store
//= require react/membership.react
//= require react/tabs/tablist.react

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
    return (
      <div>
        <h4>User Memberships</h4>
        <Tablist tabs={tabs} />
        <div className="tab-content">
          <div className="tab-pane active" id="current">{this.renderActiveMemberships()}</div>
          <div className="tab-pane" id="on-hold">{this.renderOnHoldMemberships()}</div>
          <div className="tab-pane" id="expired">{this.renderExpiredMemberships()}</div>
        </div>
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

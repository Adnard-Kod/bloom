/**
 * @jsx React.DOM
 */
//= require react
//= require stores/membership-store
//= require react/membership.react

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
    return (
      <div>
        <h4>User Memberships</h4>
        <ul className="nav nav-tabs" role="tablist">
          <li className="active"><a href="#current" role="tab" data-toggle="tab">Active</a></li>
          <li><a href="#on-hold" role="tab" data-toggle="tab">On Hold</a></li>
          <li><a href="#expired" role="tab" data-toggle="tab">Expired</a></li>
        </ul>

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

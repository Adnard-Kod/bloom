/**
 * @jsx React.DOM
 */
//= require react
//= require stores/membership-store
//= require react/membership.react

var Memberships = React.createClass({
  getInitialState: function() {
    return {
      memberships: MembershipStore.memberships()
    };
  },

  componentDidMount: function() {
    MembershipStore.addChangeEvent(function() {
      this.setState({
        memberships: MembershipStore.memberships()
      });
    }.bind(this));
    MembershipStore.getUserMemberships();
  },

  render: function() {
    var memberships = [];
    this.state.memberships.forEach(function(mem) {
      memberships.push(<Membership membership={mem} key={mem.id} />);
    });
    return (
      <div>
        <h3>Order History</h3>
        <ul className="list-group">
          {memberships}
        </ul>
      </div>
    );
  }
})

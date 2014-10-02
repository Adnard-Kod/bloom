/**
 * @jsx React.DOM
 */
//= require react
//= require stores/membership-store
//= require react/membership.react

var Memberships = React.createClass({
  render: function() {
    var memberships = [];
    this.props.memberships.forEach(function(mem) {
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

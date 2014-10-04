/**
 * @jsx React.DOM
 */
//= require react
//= require stores/membership-store
//= require react/membership.react
//= require react/page-header.react


var Memberships = React.createClass({
  render: function() {
    var memberships = [];
    this.props.memberships.forEach(function(mem) {
      memberships.push(<Membership membership={mem} key={mem.id} />);
    });
    return (
      <div>
        <PageHeader title="Order History" />
        <ul className="list-group">
          <li className="list-group-item">
            {memberships}
          </li>
        </ul>
      </div>
    );
  }
})

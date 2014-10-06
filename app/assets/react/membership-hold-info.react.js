/**
 * @jsx React.DOM
 */
//= require react

var MembershipHoldInfo = React.createClass({
  render: function() {
    var mem = this.props.membership;
    return (
      <div>
        <h4>Membership Hold Details</h4>
        <ul>
          <li className="list-group-item">Membership hold starts: {mem.hold_start}</li>
          <li className="list-group-item">There are {mem.hold_weeks_remaining} weeks remaining on your membership hold</li>
          <li className="list-group-item">Your membership hold ends on: {mem.hold_end}</li>
        </ul>
      </div>
    );
  }
});

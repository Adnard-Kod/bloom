/**
 * @jsx React.DOM
 */
//= require react

var OrderQuantity = React.createClass({
  getDefaultProps: function() {
    return {
      admin: false
    };
  },

  render: function() {
    var order = this.props.weeklyOrders;
    return (
      <div>
        <ul>
          <li className="list-group-item">{orders.name}</li>
          <li className="list-group-item">Meals Remaining: {orders.quantity}</li>
        </ul>
      </div>
    );
  }
});

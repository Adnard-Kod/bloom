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
    var order = this.props.order;
    return (
      <div>
        <ul>
          <li className="list-group-item">{order.item}: {order.quantity} </li>
        </ul>
      </div>
    );
  }
});

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
        <ul className="list-group">
          <li className="list-group-item">
          {order.item}
          <span className="badge">{order.quantity}</span>
          </li>
        </ul>
      </div>
    );
  }
});

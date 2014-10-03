/**
 * @jsx React.DOM
 */
//= require react

var WeeklyOrdersByUser = React.createClass({

  render: function() {
    var item = this.props.item;
    return (
      <div>
        <p> {item.item} <span className="badge">{item.quantity}</span></p>
      </div>
    );
  }
});


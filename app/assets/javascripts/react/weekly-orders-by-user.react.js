/**
 * @jsx React.DOM
 */
//= require react

var WeeklyOrdersByUser = React.createClass({displayName: 'WeeklyOrdersByUser',

  render: function() {
    var item = this.props.item;
    return (
      React.DOM.div(null,
        React.DOM.p(null,
          React.DOM.span({className: "badge"}, item.quantity), " ", item.item
        )
      )
    );
  }
});


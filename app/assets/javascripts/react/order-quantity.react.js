/**
 * @jsx React.DOM
 */
//= require react

var OrderQuantity = React.createClass({displayName: 'OrderQuantity',
  getDefaultProps: function() {
    return {
      admin: false
    };
  },

  render: function() {
    var order = this.props.order;
    return (
      React.DOM.div(null,
        React.DOM.ul({className: "list-group"},
          React.DOM.li({className: "list-group-item"},
            order.category, ": ", order.item,
          React.DOM.span({className: "badge"}, order.quantity)
          )
        )
      )
    );
  }
});

/**
 * @jsx React.DOM
 */
//= require react
//= require react/list-group-item.react
var ListGroup = React.createClass({displayName: 'ListGroup',
  render: function() {
    var items = [];
    this.props.list.forEach(function(item) {
      items.push(ListGroupItem({key: item.id, id: this.props.id, default: item.default, item: item.menu_item, admin: this.props.admin, user: this.props.user, selected: this.props.selected, quantity: item.quantity}))
    }.bind(this))
    return (
      React.DOM.div({className: "list-group"},
        items
      )
    );
  }

});

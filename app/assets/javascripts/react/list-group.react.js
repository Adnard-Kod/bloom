/**
 * @jsx React.DOM
 */
//= require react
//= require react/list-group-item.react
var ListGroup = React.createClass({displayName: 'ListGroup',
  render: function() {
    var items = [];
    this.props.list.forEach(function(item) {
      items.push(ListGroupItem({heading: item.name, text: item.description, removeHandler: this.props.removeHandler}))
    }.bind(this))
    return (
      React.DOM.div({className: "list-group"},
        items
      )
    );
  }

});

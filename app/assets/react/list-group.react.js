/**
 * @jsx React.DOM
 */
//= require react
//= require react/list-group-item.react
var ListGroup = React.createClass({
  render: function() {
    var items = [];
    this.props.list.forEach(function(item) {
      items.push(<ListGroupItem key={item.id} id={this.props.id} default={item.default} item={item.menu_item} admin={this.props.admin}/>)
    }.bind(this))
    return (
      <div className="list-group">
        {items}
      </div>
    );
  }

});

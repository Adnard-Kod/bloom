/**
 * @jsx React.DOM
 */
//= require react
//= require react/list-group-item.react
var ListGroup = React.createClass({
  render: function() {
    var items = [];
    this.props.list.forEach(function(item) {
      items.push(<ListGroupItem key={item.id} heading={item.menu_item.name} text={item.menu_item.description} id={item.menu_item.id} editLinks={this.editLinks(item)}/>)
    }.bind(this))
    return (
      <div className="list-group">
        {items}
      </div>
    );
  },
  editLinks: function(link) {
    if(!this.props.itemEditLinks) return false;
    var filter = "remove default";
    if (link.default) filter = "make default";
    return this.props.itemEditLinks.filter(function(link) {
      return link.name !== filter;
    });
  }

});

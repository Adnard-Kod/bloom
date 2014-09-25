/**
 * @jsx React.DOM
 */
//= require react
//= require react/list-group-item.react
var ListGroup = React.createClass({
  render: function() {
    var items = [];
    this.props.list.forEach(function(item) {
      items.push(<ListGroupItem heading={item.name} text={item.description} id={item.id} removeHandler={this.props.removeHandler}/>)
    }.bind(this))
    return (
      <div className="list-group">
        {items}
      </div>
    );
  }

});

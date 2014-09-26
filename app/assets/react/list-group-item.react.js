/**
 * @jsx React.DOM
 */
//= require react
var ListGroupItem = React.createClass({
  render: function() {
    var editLinks = this.props.editLinks ? <EditLinks links={this.props.editLinks} /> : undefined
    return (
      <div className="list-group-item">
        <h4 className="list-group-item-heading">{this.props.heading} {editLinks}</h4>
        <p className="list-group-item-text">{this.props.text}</p>
      </div>
    );
  },
  removeHandler: function(e) {
    e.preventDefault();
    this.props.removeHandler(this.props.id)
  }

});

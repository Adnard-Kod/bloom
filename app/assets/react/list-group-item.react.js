/**
 * @jsx React.DOM
 */
//= require react
var ListGroupItem = React.createClass({
  render: function() {
    var removeLink = this.props.removeHandler ? <a href="#" onClick={this.props.removeHandler}>x</a> : undefined;
    return (
      <div className="list-group-item">
        <h4 className="list-group-item-heading">{removeLink} {this.props.heading}</h4>
        <p className="list-group-item-text">{this.props.text}</p>
      </div>
    );
  }

});

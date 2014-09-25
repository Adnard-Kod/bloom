/**
 * @jsx React.DOM
 */
//= require react

var EditLinks = React.createClass({
  render: function() {
    return (
      <span>
        <strong><a href="#" className="text-warning" onClick={this.props.edit}> edit |</a></strong>
        <strong><a href="#" className="text-danger" onClick={this.props.delete}> delete</a></strong>
      </span>
    );
  }

});


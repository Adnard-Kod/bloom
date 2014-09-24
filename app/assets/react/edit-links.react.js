/**
 * @jsx React.DOM
 */
//= require react

var EditLinks = React.createClass({
  render: function() {
    return (
      <span>
        <small><a href="#" onClick={this.props.edit}> edit |</a></small>
        <small><a href="#" onClick={this.props.delete}> delete</a></small>
      </span>
    );
  }

});


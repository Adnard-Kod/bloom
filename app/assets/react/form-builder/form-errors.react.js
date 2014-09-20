/**
 * @jsx React.DOM
 */

//= require react
var FormErrors = React.createClass({
  render: function() {
    var errors = [];
    this.props.errors.forEach(function(err) {
      errors.push(<li>{err}</li>)
    })
    return (
      <ul className="form-errors">{errors}</ul>
    );
  }
});

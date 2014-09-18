/** @jsx React.DOM */
//= require react

var FormError = React.createClass({
  render: function () {
    return (
      <li>{this.props.error}</li>
    );
  }
});

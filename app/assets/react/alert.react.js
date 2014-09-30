/**
 * @jsx React.DOM
 */
//= require react
var Alert = React.createClass({
  render: function() {
    var className = "alert alert-success";
    if(this.props.danger) className = "alert alert-danger";
    return (
      <div className={className} role="alert">{this.props.message}</div>
    );
  }

});

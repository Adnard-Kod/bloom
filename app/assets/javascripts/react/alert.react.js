/**
 * @jsx React.DOM
 */
//= require react
var Alert = React.createClass({displayName: 'Alert',
  render: function() {
    var className = "alert alert-success";
    if(this.props.danger) className = "alert alert-danger";
    return (
      React.DOM.div({className: className, role: "alert"}, this.props.message)
    );
  }

});

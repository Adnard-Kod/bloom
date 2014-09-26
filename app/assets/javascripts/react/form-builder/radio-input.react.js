/** @jsx React.DOM */
//= require react

var RadioInput = React.createClass({displayName: 'RadioInput',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.input({ref: data.name, type: "radio", className: data.className})
    );
  }
})

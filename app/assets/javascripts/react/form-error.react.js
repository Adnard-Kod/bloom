/** @jsx React.DOM */
//= require react

var FormError = React.createClass({displayName: 'FormError',
  render: function () {
    return (
      React.DOM.li(null, this.props.error)
    );
  }
});

/**
 * @jsx React.DOM
 */
//= require react

var EditLinks = React.createClass({displayName: 'EditLinks',
  render: function() {
    return (
      React.DOM.span(null,
        React.DOM.strong(null, React.DOM.a({href: "#", className: "text-warning", onClick: this.props.edit}, " edit |")),
        React.DOM.strong(null, React.DOM.a({href: "#", className: "text-danger", onClick: this.props.delete}, " delete"))
      )
    );
  }

});


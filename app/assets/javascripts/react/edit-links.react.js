/**
 * @jsx React.DOM
 */
//= require react

var EditLinks = React.createClass({displayName: 'EditLinks',
  render: function() {
    return (
      React.DOM.span(null,
        React.DOM.small(null, React.DOM.a({href: "#", onClick: this.props.edit}, " edit |")),
        React.DOM.small(null, React.DOM.a({href: "#", onClick: this.props.delete}, " delete"))
      )
    );
  }

});


/**
 * @jsx React.DOM
 */
//= require react

var EditLinks = React.createClass({displayName: 'EditLinks',
  render: function() {
    var links = [];
    this.props.links.forEach(function(link, panel, i) {
      var className = link.className || 'text-default';
      links.push(React.DOM.strong(null, React.DOM.a({href: "#", className: className, onClick: link.handler}, " ", link.name, " ")));
    })
    return (
      React.DOM.span(null,
        links
      )
    );
  }
});


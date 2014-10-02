/**
 * @jsx React.DOM
 */
//= require react

var Tab = React.createClass({displayName: 'Tab',

  render: function() {
    var tab = this.props.tab;
    var href = '#' + tab.href;
    return (
      React.DOM.li(null, 
        React.DOM.a({className: this.props.active, href: href, role: "tab", 'data-toggle': "tab"}, 
          tab.name
        )
      )
    );
  }
});

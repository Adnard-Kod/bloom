/**
 * @jsx React.DOM
 */
//= require react
//= require react/tabs/tab.react

var Tablist = React.createClass({displayName: 'Tablist',
  render: function() {
    var tabs = [];
    this.props.tabs.forEach(function(tab, index) {
      if (index === 0) var classActive = 'active';
      tabs.push(Tab({active: classActive, tab: this.props.tabs[index]}));
    }.bind(this));

    return (
      React.DOM.ul({className: "nav nav-tabs", role: "tablist"}, 
        tabs
      )
    );
  }
})

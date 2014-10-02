/**
 * @jsx React.DOM
 */
//= require react
//= require react/tabs/tablist.react
//= require react/tabs/tab-content.react

var TogglableTabs = React.createClass({displayName: 'TogglableTabs',
  render: function() {
    return (
      React.DOM.div(null, 
        Tablist({tabs: this.props.tabNames}), 
        TabContent(null)
      )
    );
  }
});

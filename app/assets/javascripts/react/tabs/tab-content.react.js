/**
 * @jsx React.DOM
 */
//= require react

var TabContent = React.createClass({displayName: 'TabContent',
  render: function() {
    var tabContent = this.props.tabContent;
    var classes = 'tab-pane ' + this.props.active;
    return (
      React.DOM.div({className: classes, id: tabContent.id}, 
        tabContent.content
      )
    );
  }
});

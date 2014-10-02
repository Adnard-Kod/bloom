/**
 * @jsx React.DOM
 */
//= require react
//= require react/tabs/tab-content.react

var TabContents = React.createClass({displayName: 'TabContents',
  render: function() {
    var contents = [];
    this.props.tabContents.forEach(function(content, index) {
      if(index === 0) var classActive = 'active';
      contents.push(TabContent({active: classActive, tabContent: content}));
    }.bind(this));
    return (
      React.DOM.div({className: "tab-content"}, 
        contents
      )
    );
  }
})

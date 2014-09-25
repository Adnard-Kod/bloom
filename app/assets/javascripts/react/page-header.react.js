/**
 * @jsx React.DOM
 */
//= require react

var PageHeader = React.createClass({displayName: 'PageHeader',

  render: function() {
    return (
      React.DOM.h2({className: "page-header"}, " ", this.props.title)
    );
  }

});

/**
 * @jsx React.DOM
 */
//= require react
var ListGroupItem = React.createClass({displayName: 'ListGroupItem',
  render: function() {
    var editLinks = this.props.editLinks ? EditLinks({links: this.props.editLinks}) : undefined
    return (
      React.DOM.div({className: "list-group-item"},
        React.DOM.h4({className: "list-group-item-heading"}, this.props.heading, " ", editLinks),
        React.DOM.p({className: "list-group-item-text"}, this.props.text)
      )
    );
  },
  removeHandler: function(e) {
    e.preventDefault();
    this.props.removeHandler(this.props.id)
  }

});

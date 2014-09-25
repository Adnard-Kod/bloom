/**
 * @jsx React.DOM
 */
//= require react
var ListGroupItem = React.createClass({displayName: 'ListGroupItem',
  render: function() {
    var removeLink = this.props.removeHandler ? React.DOM.a({href: "#", onClick: this.removeHandler}, "x") : undefined;
    return (
      React.DOM.div({className: "list-group-item"},
        React.DOM.h4({className: "list-group-item-heading"}, removeLink, " ", this.props.heading),
        React.DOM.p({className: "list-group-item-text"}, this.props.text)
      )
    );
  },
  removeHandler: function(e) {
    e.preventDefault();
    this.props.removeHandler(this.props.id)
  }

});

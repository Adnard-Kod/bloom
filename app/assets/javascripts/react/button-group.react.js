/**
 * @jsx React.DOM
 */
//= require react
var ButtonGroup = React.createClass({displayName: 'ButtonGroup',
  render: function() {
    var buttons = [];
    this.props.buttons.forEach(function(button) {
      buttons.push(React.DOM.button({key: button.id, 'data-id': button.id, type: "button", onClick: button.handler, className: "btn btn-default"}, button.name));
    })
    return (
      React.DOM.div({className: "btn-group"},
        buttons
      )
    );
  }

});

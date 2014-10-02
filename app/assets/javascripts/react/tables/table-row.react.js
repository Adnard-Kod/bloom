/**
 * @jsx React.DOM
 */
//= require react

var TableRow = React.createClass({displayName: 'TableRow',
  render: function() {
    return (
      React.DOM.tr(null, 
        this.props.rowCells
      )
    );
  }
});

/**
 * @jsx React.DOM
 */
//= require react

var TableCell = React.createClass({displayName: 'TableCell',
  render: function() {
    return (
      React.DOM.td(null, 
        this.props.cell
      )
    );
  }
});

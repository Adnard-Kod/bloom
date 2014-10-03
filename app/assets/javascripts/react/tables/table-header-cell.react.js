/**
 * @jsx React.DOM
 */
//= require react

var TableHeaderCell = React.createClass({displayName: 'TableHeaderCell',
  render: function() {
    return (
      React.DOM.th(null, 
        this.props.cell
      )
    );
  }
});

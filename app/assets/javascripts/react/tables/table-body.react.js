/**
 * @jsx React.DOM
 */
//= require react
//= require react/tables/table-row.react
//= require react/tables/table-cell.react

var TableBody = React.createClass({displayName: 'TableBody',
  render: function() {
    var bodyRows = [];
    this.props.rows.forEach(function(row, index) {
      var rowCells = [];
      Object.keys(row).forEach(function(prop) {
        rowCells.push(TableCell({cell: row[prop]}));
      });
      bodyRows.push(TableRow({rowCells: rowCells, key: row.id}));
    });
    return (
      React.DOM.tbody(null, 
        bodyRows
      )
    );
  }
});

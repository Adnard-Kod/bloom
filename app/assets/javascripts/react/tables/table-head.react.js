/**
 * @jsx React.DOM
 */
//= require react
//= require react/tables/table-row.react
//= require react/tables/table-header-cell.react

var TableHead = React.createClass({displayName: 'TableHead',
  render: function() {
    var headerCells = [];
    this.props.headers.forEach(function(header) {
      headerCells.push(TableHeaderCell({cell: header}));
    });
    return (
      React.DOM.thead(null, 
        TableRow({rowCells: headerCells})
      )
    );
  }
});

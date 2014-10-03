/**
 * @jsx React.DOM
 */
//= require react
//= require react/tables/table-row.react
//= require react/tables/table-header-cell.react

var TableHead = React.createClass({
  render: function() {
    var headerCells = [];
    this.props.headers.forEach(function(header) {
      headerCells.push(<TableHeaderCell cell={header} />);
    });
    return (
      <thead>
        <TableRow rowCells={headerCells} />
      </thead>
    );
  }
});

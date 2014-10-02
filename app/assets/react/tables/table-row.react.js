/**
 * @jsx React.DOM
 */
//= require react

var TableRow = React.createClass({
  render: function() {
    return (
      <tr>
        {this.props.rowCells}
      </tr>
    );
  }
});

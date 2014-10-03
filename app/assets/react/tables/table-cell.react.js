/**
 * @jsx React.DOM
 */
//= require react

var TableCell = React.createClass({
  render: function() {
    return (
      <td>
        {this.props.cell}
      </td>
    );
  }
});

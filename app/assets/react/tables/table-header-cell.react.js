/**
 * @jsx React.DOM
 */
//= require react

var TableHeaderCell = React.createClass({
  render: function() {
    return (
      <th>
        {this.props.cell}
      </th>
    );
  }
});

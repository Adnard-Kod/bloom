/**
 * @jsx React.DOM
 */
//= require react

var NumberInput = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <input type="number" defaultValue={data.defaultValue} />
    );
  }

});

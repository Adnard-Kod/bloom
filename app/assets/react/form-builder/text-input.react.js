/**
 * @jsx React.DOM
 */
//= require react

var TextInput = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <input type="text" defaultValue={data.defaultValue} placeholder={data.placeholder} />
    );
  }

});

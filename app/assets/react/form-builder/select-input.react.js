/**
 * @jsx React.DOM
 */
//= require react
//= require react/form-builder/options-for-select.react
var SelectInput = React.createClass({
  render: function() {
    var data = this.props.data;
    var options = [];
    var value = data.value || "";
    data.values.forEach(function(value) {
      options.push(<OptionForSelect value={value}/>)
    }.bind(this))
    console.log(data.value)
    return (
      <select value={data.value}>
        {options}
      </select>
    );
  }

});

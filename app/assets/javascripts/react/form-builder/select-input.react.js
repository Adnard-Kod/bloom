/**
 * @jsx React.DOM
 */
//= require react
//= require react/form-builder/options-for-select.react
var SelectInput = React.createClass({displayName: 'SelectInput',
  render: function() {
    var data = this.props.data;
    var options = [];
    data.values.forEach(function(value) {
      options.push(OptionForSelect({key: value.value, value: value.value, show: value.show}))
    }.bind(this))
    return (
      React.DOM.select({ref: data.name, defaultValue: data.value, className: data.className, id: data.id}, 
        options
      )
    );
  }

});

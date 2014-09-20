/**
 * @jsx React.DOM
 */
//= require react
//= require react/form-builder/input.react
var FormFor = React.createClass({displayName: 'FormFor',
  render: function() {
    var submit = this.props.object.id ? 'Update' : 'Create'
    return (
      React.DOM.form(null, 
        this.inputs(),
        React.DOM.input( {type:"submit",  value:submit} )
      )
    );
  },
  inputs: function() {
    var object = this.props.object;
    var inputs = [];
    Object.keys(object).forEach(function(key) {
      var value = object[key];
      var options = this.props.options[key] || {};
      var dataForInput = {value: value, name: key}
      inputs.push(Input( {data:dataForInput, options:options}));
    }.bind(this));
    return inputs;
  }

});

$(document).ready(function() {
  var todo = {
    id: 1,
    title: "yo",
    age: 20,
    completed: true,
    rating: 2,
    password: "yasalam"
  }
  var options = {
    rating: {
      type: 'select',
      values: [1, 2, 3, 4, 5]
    }
  }
  React.renderComponent(FormFor( {object:todo, options:options}), $('body')[0])
})

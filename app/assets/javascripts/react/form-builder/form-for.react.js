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
      var dataForInput = {type: this.type(key, value), value: value, name: key}
      inputs.push(Input( {data:dataForInput} ));
    }.bind(this));
    return inputs;
  },
  type: function(key, value) {
    if(this.props.options[key]) return this.props.options[key].type;
    return typeof(value);
  }

});

$(document).ready(function() {
  var todo = {
    id: 1,
    title: "yo",
    age: 20,
    completed: true
  }
  var options = {
    // age: {
    //   type: 'text'
    // }
  }
  React.renderComponent(FormFor( {object:todo, options:options}), $('body')[0])
})

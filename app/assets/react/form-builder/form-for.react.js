/**
 * @jsx React.DOM
 */
//= require react
//= require react/form-builder/input.react
//= require react/form-builder/form-errors.react
var FormFor = React.createClass({
  render: function() {
    if(Object.keys(this.props.object).length === 0) return(<div />);
    return (
      <form onSubmit={this.handleSubmit}>
        <FormErrors errors={this.props.errors} />
        {this.inputs()}
        <input type="submit"  value={this.submitText()} className="btn btn-default"/>
      </form>
    );
  },
  inputs: function() {
    var object = this.props.object;
    var inputs = [];
    Object.keys(object).forEach(function(key, i) {
      var value = object[key];
      var dataForInput = {value: value, name: key}
      var options = this.options()[key] || {};
      inputs.push(<Input key={key} ref={key} data={dataForInput} options={options}/>);
    }.bind(this));
    return inputs;
  },
  options: function() {
    return this.props.options || {};
  },
  submitText: function() {
    var submit = this.props.object.id ? 'Update' : 'Create';
    if(this.options().name) submit = submit + ' ' + this.options().name;
    return submit;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var submitHandler = this.options().onSubmit
    if(submitHandler) {
      var data = {};
      Object.keys(this.refs).forEach(function(ref) {
        var value = this.getInputValue(ref);
        data[ref] = value;
      }.bind(this))
      console.log(data)
      submitHandler(data);
    }
  },
  getInputValue: function(ref) {
    var input = undefined;
    // find the ref component
    // find the refs of the found component
    // find the input ref from the found component
    // get the getDOMNode and the value
    if(this.refs[ref] && this.refs[ref].refs && this.refs[ref].refs.input && this.refs[ref].refs.input.getDOMNode) input = this.refs[ref].refs.input.getDOMNode().value;
    return input;
  }

});

// $(document).ready(function() {
//   var todo = {
//     id: 1,
//     title: "yo",
//     age: 20,
//     completed: true,
//     rating: 2,
//     password: "yasalam"
//   }
//   var options = {
//     rating: {
//       type: 'select',
//       values: [1, 2, 3, 4, 5]
//     }
//   }
//   React.renderComponent(<FormFor object={todo} options={options}/>, $('body')[0])
// })

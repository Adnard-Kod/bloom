/**
 * @jsx React.DOM
 */
//= require react
//= require react/form-builder/text-input.react
//= require react/form-builder/checkbox-input.react
//= require react/form-builder/number-input.react
//= require react/form-builder/hidden-input.react
//= require react/form-builder/select-input.react
//= require react/form-builder/password-input.react
var Input = React.createClass({displayName: 'Input',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.div(null, 
        this.input()
      )
    );
  },
  input: function() {
    var data = this.props.data;
    switch(this.type()) {
      case 'boolean':
        return(CheckboxInput( {data:{defaultChecked: data.value, placeholder: this.placeholder()}} ))
        break;
      case 'number':
        return(NumberInput( {data:{defaultValue: data.value, placeholder: this.placeholder()}} ))
        break;
      case 'hidden':
        return(HiddenInput( {data:{value: data.value, placeholder: this.placeholder()}} ))
        break;
      case 'select':
        return(SelectInput( {data:{value: data.value, values: this.props.options.values }} ))
        break;
      case 'password':
        return(PasswordInput( {data:{defaultChecked: data.value, placeholder: this.placeholder()}} ))
        break;
      default:
        return(TextInput( {data:{defaultValue: data.value, placeholder: this.placeholder()}} ))
    }

  },
  type: function() {
    var type = typeof(this.props.data.value);
    if(this.props.options.type) type = this.props.options.type;
    if(this.isId()) type = 'hidden';
    if(this.isPassword()) type = 'password';
    return type;
  },
  isId: function() {
    if(this.props.data.name === 'id') return true;
    return false;
  },
  isPassword: function() {
    if(this.props.data.name === 'password') return true;
    return false;
  },
  placeholder: function() {
    var name = this.props.options.placeholder || this.props.data.name;
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
});

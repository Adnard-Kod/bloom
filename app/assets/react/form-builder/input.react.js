/**
 * @jsx React.DOM
 */
//= require react
//= require react/form-builder/text-input.react
//= require react/form-builder/checkbox-input.react
//= require react/form-builder/number-input.react
//= require react/form-builder/hidden-input.react
var Input = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <div>
        {this.input()}
      </div>
    );
  },
  input: function() {
    var data = this.props.data;
    var type = data.type;
    if(this.isId()) type = 'hidden';
    if(type)
    switch(type) {
      case 'boolean':
        return(<CheckboxInput data={{defaultChecked: data.value}} />)
        break;
      case 'number':
        return(<NumberInput data={{defaultValue: data.value}} />)
        break;
      case 'hidden':
        return(<HiddenInput data={{value: data.value}} />)
        break;
      default:
        return(<TextInput data={{defaultValue: data.value}} />)
    }

  },
  isId: function() {
    if(this.props.data.name === 'id') return true;
    return false;
  }
});

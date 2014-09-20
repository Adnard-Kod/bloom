/**
 * @jsx React.DOM
 */
//= require react

var TextareaInput = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <textarea ref={data.name} defaultValue={data.defaultValue} placeholder={data.placeholder} />
    );
  }

});

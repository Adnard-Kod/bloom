/**
 * @jsx React.DOM
 */
//= require react

var PasswordInput = React.createClass({displayName: 'PasswordInput',
  render: function() {
    var data = this.props.data;
    return (
      React.DOM.input( {type:"password", defaultValue:data.defaultValue, placeholder:data.placeholder} )
    );
  }

});

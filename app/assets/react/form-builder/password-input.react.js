/**
 * @jsx React.DOM
 */
//= require react

var PasswordInput = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <input type="password" defaultValue={data.defaultValue} placeholder={data.placeholder} />
    );
  }

});

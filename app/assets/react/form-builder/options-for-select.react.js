/**
 * @jsx React.DOM
 */
//= requrie 'react'

var OptionForSelect = React.createClass({

  render: function() {
    return (
      <option value={this.props.value}>{this.props.value}</option>
    );
  }

});

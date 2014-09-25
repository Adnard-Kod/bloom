/**
 * @jsx React.DOM
 */
//= require react

var PageHeader = React.createClass({

  render: function() {
    return (
      <h2 className="page-header"> {this.props.title}</h2>
    );
  }

});

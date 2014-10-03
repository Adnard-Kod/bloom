/**
 * @jsx React.DOM
 */
//= require react
//= require react/tables/table-head.react
//= require react/tables/table-body.react

var Table = React.createClass({displayName: 'Table',
  render: function() {
    var table = this.props.tableInfo;
    return (
      React.DOM.div({className: "col-lg-6"}, 
        React.DOM.div({className: "table-responsive"}, 
          this.renderTableName(), 
          React.DOM.table({className: "table table-bordered table-hover table-striped"}, 
            TableHead({headers: this.getTableHeaders()}), 
            TableBody({rows: table})
          )
        )
      )
    );
  },

  getTableHeaders: function() {
    if(this.props.tableInfo) return Object.keys(this.props.tableInfo[0]);
  },

  renderTableName: function() {
    if(this.props.name) return (React.DOM.h4(null, this.props.name));
  }
});

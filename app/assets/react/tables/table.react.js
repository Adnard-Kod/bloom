/**
 * @jsx React.DOM
 */
//= require react
//= require react/tables/table-head.react
//= require react/tables/table-body.react

var Table = React.createClass({
  render: function() {
    var table = this.props.tableInfo;
    return (
      <div className="col-lg-6">
        <div className="table-responsive">
          {this.renderTableName()}
          <table className="table table-bordered table-hover table-striped">
            <TableHead headers={this.getTableHeaders()} />
            <TableBody rows={table} />
          </table>
        </div>
      </div>
    );
  },

  getTableHeaders: function() {
    if(this.props.tableInfo) return Object.keys(this.props.tableInfo[0]);
  },

  renderTableName: function() {
    if(this.props.name) return (<h4>{this.props.name}</h4>);
  }
});

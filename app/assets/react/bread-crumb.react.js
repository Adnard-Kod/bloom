/**
 * @jsx React.DOM
 */
//= require react

var BreadCrumb = React.createClass({

  render: function() {
    var crumbs = [];
    this.props.crumbs.forEach(function(crumb, i) {
      crumbs.push(<li key={i} className="active"><i className="fa fa-edit"></i>{crumb}</li>)
    })
    return (
      <ol className="breadcrumb">
        {crumbs}
      </ol>
    );
  }

});

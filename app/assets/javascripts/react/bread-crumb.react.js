/**
 * @jsx React.DOM
 */
//= require react

var BreadCrumb = React.createClass({displayName: 'BreadCrumb',

  render: function() {
    var crumbs = [];
    this.props.crumbs.forEach(function(crumb, i) {
      crumbs.push(React.DOM.li({key: i, className: "active"}, React.DOM.i({className: "fa fa-edit"}), crumb))
    })
    return (
      React.DOM.ol({className: "breadcrumb"},
        crumbs
      )
    );
  }

});

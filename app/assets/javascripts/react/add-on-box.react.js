/** @jsx React.DOM */
//= require react
//= require react/add-ons.react
//= require react/add-on-form.react

var AddOnBox = React.createClass({displayName: 'AddOnBox',
  render: function(){
    return (
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            PageHeader({title: "Add On Items"}),
            BreadCrumb({crumbs: ["Menu Management", "Add On Items"]})
          )
        ),
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            AddOnForm(null),
            React.DOM.hr(null),
            AddOns(null)
          )
        )
      )
    )
  }
})

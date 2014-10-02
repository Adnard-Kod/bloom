/** @jsx React.DOM */
//= require react
//= require react/admin-users.react
var AdminUsersBox = React.createClass({displayName: 'AdminUsersBox',
  render: function(){
    return (
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            PageHeader({title: "Users"}),
            BreadCrumb({crumbs: ["User Management", "Users"]})
          )
        ),
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            AdminUsers(null)
          )
        )
      )
    )
  }
})

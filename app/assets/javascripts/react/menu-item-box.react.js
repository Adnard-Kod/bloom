/** @jsx React.DOM */
//= require react
//= require react/menu-items.react
//= require react/menu-item-form.react

var MenuItemBox = React.createClass({displayName: 'MenuItemBox',
  render: function(){
    return (
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            PageHeader({title: "Menus Items"}),
            BreadCrumb({crumbs: ["Menu Management", "Menu Items"]})
          )
        ),
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            MenuItemForm(null),
            React.DOM.hr(null),
            MenuItems(null)
          )
        )
      )
    )
  }
})

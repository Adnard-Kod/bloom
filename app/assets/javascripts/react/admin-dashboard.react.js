/** @jsx React.DOM */
//= require react
//= require react/subscriptions.react
//= require react/subscription-form.react
//= require react/menus.react
//= require react/menu-item-box.react
//= require react/bread-crumb.react
//= require react/page-header.react
var AdminDashboard = React.createClass({displayName: 'AdminDashboard',
  render: function() {
    return (
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            PageHeader({title: "Menus"}),
            BreadCrumb({crumbs: ["Menu Management", "Menus"]})
          )
        ),
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            MenuForm(null),
            Menus(null)
          )
        )
      )
    )
  }
})

// <PageHeading header="Menu" subHeader="Menus"/>
//         <SubscriptionForm />
//         <Subscriptions />
//         <MenuForm />
//         <Menus />
//         <MenuItemBox />

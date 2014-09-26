/** @jsx React.DOM */
//= require react
//= require react/subscriptions.react
//= require react/subscription-form.react
//= require react/menus.react
//= require react/menu-item-box.react
//= require react/bread-crumb.react
//= require react/page-header.react
var AdminDashboard = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader title="Menus" />
            <BreadCrumb crumbs={["Menu Management", "Menus"]}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <MenuForm />
            <Menus admin={true}/>
          </div>
        </div>
      </div>
    )
  }
})

// <PageHeading header="Menu" subHeader="Menus"/>
//         <SubscriptionForm />
//         <Subscriptions />
//         <MenuForm />
//         <Menus />
//         <MenuItemBox />

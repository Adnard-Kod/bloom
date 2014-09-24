/** @jsx React.DOM */
//= require react
//= require react/subscriptions.react
//= require react/subscription-form.react
//= require react/menus.react
//= require react/menu-item-box.react
//= require react/bread-crumb.react
var AdminDashboard = React.createClass({
  render: function() {
    return (
      <div id="admin-dashboard">
        <div id='content'>
          <div id='menus-component'>
            <div id="page-wrapper">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <h2 className="page-header">
                      Menus
                    </h2>
                    <BreadCrumb crumbs={["Menu", "Menus"]}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <MenuForm />
                    <Menus />
                  </div>
                </div>
              </div>
            </div>
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

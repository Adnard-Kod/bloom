/** @jsx React.DOM */
//= require react
//= require react/menu-items.react
//= require react/menu-item-form.react

var MenuItemBox = React.createClass({
  render: function(){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader title="Menus" />
            <BreadCrumb crumbs={["Menu Management", "Menu Items"]}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <MenuItemForm />
            <hr />
            <MenuItems />
          </div>
        </div>
      </div>
    )
  }
})

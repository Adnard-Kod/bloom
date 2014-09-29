/** @jsx React.DOM */
//= require react
//= require react/add-ons.react
//= require react/menu-item-form.react

var AddOnBox = React.createClass({
  render: function(){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader title="Add On Items" />
            <BreadCrumb crumbs={["Menu Management", "Add On Items"]}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <MenuItemForm />
            <hr />
            <AddOns />
          </div>
        </div>
      </div>
    )
  }
})

/** @jsx React.DOM */
//= require react
//= require react/admin-users.react
var AdminUsersBox = React.createClass({
  render: function(){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader title="Users" />
            <BreadCrumb crumbs={["User Management", "Users"]}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <AdminUsers />
          </div>
        </div>
      </div>
    )
  }
})

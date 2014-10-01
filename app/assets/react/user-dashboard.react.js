/** @jsx React.DOM */
//= require react
//= require react/current-menu.react
//= require react/active-add-ons.react
var UserDashboard = React.createClass({
  render: function () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <CurrentMenu />
            <ActiveAddOns />
          </div>
        </div>
      </div>
    )
  }
});

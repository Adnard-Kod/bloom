/** @jsx React.DOM */
//= require react
//= require react/current-menu.react
var UserDashboard = React.createClass({
  render: function () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <CurrentMenu />
          </div>
        </div>
      </div>
    )
  }
});

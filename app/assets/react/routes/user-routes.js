/**
 * @jsx React.DOM
 */
//= require router/router
//= require react/user-dashboard.react
//= require react/user-address-form.react

Router.routes = (function() {
  var _userDashBoard = function() {
    React.renderComponent(<UserDashboard />, $('#user-dashboard')[0]);
  };
  var _userDashboardAddress = function () {
    React.renderComponent(<UserAddressForm />, $('#user-dashboard')[0]);
  };
  return {
    "": _userDashBoard,
    "#address": _userDashboardAddress
  }
}());

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

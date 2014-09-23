/**
 * @jsx React.DOM
 */
//= require router/router
//= require react/user-dashboard.react
//= require react/user-addresses.react

Router.routes = (function() {
  var _userDashBoard = function() {
    React.renderComponent(UserDashboard(null), $('#user-dashboard')[0]);
  };
  var _userDashboardAddresses = function () {
    React.renderComponent(UserAddresses(null), $('#user-dashboard')[0]);
  };
  return {
    "": _userDashBoard,
    "#address": _userDashboardAddresses
  }
}());

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

/**
 * @jsx React.DOM
 */
//= require router/router
//= require react/user-dashboard.react
//= require react/user-addresses.react
//= require react/user-address-form.react

Router.routes = (function() {
  var _userDashBoard = function() {
    React.renderComponent(UserDashboard(null), $('#user-dashboard')[0]);
  };
  var _userDashboardAddresses = function () {
    React.renderComponent(UserAddresses(null), $('#user-dashboard')[0]);
  };
  var _userDashboardAddressesCreate = function () {
    React.renderComponent(UserAddressForm(null), $('#user-dashboard')[0]);
  };
  return {
    "": _userDashBoard,
    "#address": _userDashboardAddresses,
    "#create-address": _userDashboardAddressesCreate
  }
}());

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

/**
 * @jsx React.DOM
 */
//= require router/router
//= require react/user-dashboard.react
//= require react/user-account.react
//= require react/memberships.react

Router.routes = (function() {
  var _userDashBoard = function() {
    React.unmountComponentAtNode($('#user-dashboard')[0]);
    React.renderComponent(<UserDashboard />, $('#user-dashboard')[0]);
  };
  var _userDashboardAccount = function() {
    React.unmountComponentAtNode($('#user-dashboard')[0]);
    React.renderComponent(<UserAccount />, $('#user-dashboard')[0]);
  }
  var _userOrderHistory = function() {
    React.unmountComponentAtNode($('#user-dashboard')[0]);
    React.renderComponent(<Memberships />, $('#user-dashboard')[0]);
  };
  return {
    "": _userDashBoard,
    "#account": _userDashboardAccount,
    "#order-history": _userOrderHistory
  }
}());

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

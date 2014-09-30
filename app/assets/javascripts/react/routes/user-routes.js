/**
 * @jsx React.DOM
 */
//= require router/router
//= require react/user-dashboard.react
//= require react/user-account.react

Router.routes = (function() {
  var _userDashBoard = function() {
    React.renderComponent(UserDashboard(null), $('#user-dashboard')[0]);
  };
  var _userDashboardAccount = function() {
    React.renderComponent(UserAccount(null), $('#user-dashboard')[0]);
  }
  return {
    "": _userDashBoard,
    "#account": _userDashboardAccount
  }
}());

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

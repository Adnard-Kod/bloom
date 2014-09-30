/**
 * @jsx React.DOM
 */
//= require router/router
//= require react/user-dashboard.react
//= require react/user-addresses.react
//= require react/subscriptions.react
//= require react/user-membership-options.react
//= require react/user-account.react

Router.routes = (function() {
  var _userDashBoard = function() {
    React.renderComponent(UserDashboard(null), $('#user-dashboard')[0]);
  };
  var _userDashboardAddresses = function () {
    React.renderComponent(UserAddresses(null), $('#user-dashboard')[0]);
  };
  var _userDashBoardSubscriptions = function () {
    React.renderComponent(Subscriptions(null), $('#user-dashboard')[0])
  };
  var _userMembershipOptions = function () {
    React.renderComponent(UserMembershipOptions(null), $('#user-dashboard')[0])
  };
  var _userDashboardAccount = function() {
    React.renderComponent(UserAccount(null), $('#user-dashboard')[0]);
  }
  return {
    "": _userDashBoard,
    "#address": _userDashboardAddresses,
    "#subscriptions": _userDashBoardSubscriptions,
    "#options": _userMembershipOptions,
    "#account": _userDashboardAccount
  }
}());

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

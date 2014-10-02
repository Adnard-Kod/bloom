/**
 * @jsx React.DOM
 */
//= require router/router
//= require react/user-dashboard.react
//= require react/user-profile.react
Router.routes = (function() {
  var _userDashBoard = function() {
    React.unmountComponentAtNode($('#user-dashboard')[0]);
    React.renderComponent(UserDashboard(null), $('#user-dashboard')[0]);
  };
  var _userDashboardAccount = function() {
    React.unmountComponentAtNode($('#user-dashboard')[0]);
    React.renderComponent(UserAccount(null), $('#user-dashboard')[0]);
  }
  var _userOrderHistory = function() {
    React.unmountComponentAtNode($('#user-dashboard')[0]);
    React.renderComponent(Memberships(null), $('#user-dashboard')[0]);
  }
  var _userProfile = function() {
    React.unmountComponentAtNode($('#user-dashboard')[0]);
    React.renderComponent(UserProfile(null), $('#user-dashboard')[0]);
  }
  return {
    "": _userDashBoard,
    "#user-profile": _userProfile
  }
}());

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

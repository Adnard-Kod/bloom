/**
 * @jsx React.DOM
 */
//= require router/router
//= require react/admin-dashboard.react
//= require react/menu-item-box.react
//= require react/subscriptions.react
Router.routes = (function() {
  var _adminDashBoard = function() {
    React.renderComponent(<AdminDashboard />, $('#admin-page')[0])
  }
  var _menuItemsBox = function() {
    React.renderComponent(<MenuItemBox />, $('#admin-page')[0])
  }
  var _subscriptions = function() {
    React.renderComponent(<Subscriptions admin={true} />, $('#admin-page')[0])
  }
  return {
    "": _adminDashBoard,
    "#menu-items": _menuItemsBox,
    "#subscriptions": _subscriptions
  }
}());

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

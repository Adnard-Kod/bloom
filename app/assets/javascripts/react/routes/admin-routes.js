/**
 * @jsx React.DOM
 */
//= require router/router
//= require react/admin-dashboard.react
//= require react/menu-item-box.react
Router.routes = (function() {
  var _adminDashBoard = function() {
    React.renderComponent(AdminDashboard(null), $('#admin-page')[0])
  }
  var _menuItemsBox = function() {
    React.renderComponent(MenuItemBox(null), $('#admin-page')[0])
  }
  return {
    "": _adminDashBoard,
    "#menu-items": _menuItemsBox,
  }
}());

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

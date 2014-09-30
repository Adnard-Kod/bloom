/**
 * @jsx React.DOM
 */
//= require router/router
//= require react/admin-dashboard.react
//= require react/menu-item-box.react
//= require react/subscriptions.react
//= require react/add-on-box.react
//= require react/promotions.react
Router.routes = (function() {
  var _adminDashBoard = function() {
    React.renderComponent(AdminDashboard(null), $('#admin-page')[0])
  }
  var _menuItemsBox = function() {
    React.renderComponent(MenuItemBox(null), $('#admin-page')[0])
  }
  var _subscriptions = function() {
    React.renderComponent(Subscriptions({admin: true}), $('#admin-page')[0])
  }
  var _addOnBox = function() {
    React.renderComponent(AddOnBox(null), $('#admin-page')[0])
  }
  var _promotions = function() {
    React.renderComponent(Promotions({admin: true}), $('#admin-page')[0])
  }
  return {
    "": _adminDashBoard,
    "#menu-items": _menuItemsBox,
    "#subscriptions": _subscriptions,
    "#add-ons": _addOnBox, 
    "#promotions": _promotions
  }
}());

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

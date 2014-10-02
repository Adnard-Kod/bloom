/**
 * @jsx React.DOM
 */
//= require router/router
//= require react/admin-dashboard.react
//= require react/menu-item-box.react
//= require react/subscriptions.react
//= require react/add-on-box.react
//= require react/promotions.react
//= require react/admin-users-box.react
//= require react/user-profile.react
//= require react/memberships-admin.react
Router.routes = (function() {
  var _adminDashBoard = function() {
    React.unmountComponentAtNode($('#admin-page')[0]);
    React.renderComponent(AdminDashboard(null), $('#admin-page')[0])
  }
  var _menuItemsBox = function() {
    React.unmountComponentAtNode($('#admin-page')[0]);
    React.renderComponent(MenuItemBox(null), $('#admin-page')[0])
  }
  var _subscriptions = function() {
    React.unmountComponentAtNode($('#admin-page')[0]);
    React.renderComponent(Subscriptions({admin: true}), $('#admin-page')[0])
  }
  var _addOnBox = function() {
    React.unmountComponentAtNode($('#admin-page')[0]);
    React.renderComponent(AddOnBox(null), $('#admin-page')[0])
  }
  var _promotions = function() {
    React.unmountComponentAtNode($('#admin-page')[0]);
    React.renderComponent(Promotions({admin: true}), $('#admin-page')[0])
  }
  var _adminUserBox = function() {
    React.unmountComponentAtNode($('#admin-page')[0]);
    React.renderComponent(AdminUsersBox(null), $('#admin-page')[0])
  }
  var _userProfile = function(id) {
    React.unmountComponentAtNode($('#admin-page')[0]);
    React.renderComponent(UserProfile({admin: true, userId: id}), $('#admin-page')[0])
  }
  var _memberships = function() {
    React.unmountComponentAtNode($('#admin-page')[0]);
    React.renderComponent(MembershipsAdmin(null), $('#admin-page')[0]);
  };
  return {
    "": _adminDashBoard,
    "#menu-items": _menuItemsBox,
    "#subscriptions": _subscriptions,
    "#add-ons": _addOnBox,
    "#promotions": _promotions,
    "#admin-users": _adminUserBox,
    "#user-profile/": _userProfile,
    "#memberships": _memberships
  }
}());

$(document).ready(function() {
  Router.route(window.location.hash);
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

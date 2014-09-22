/**
 * @jsx React.DOM
 */
//= require router/router
//= require react/admin-dashboard.react
Router.routes = (function() {
  var _adminDashBoard = function() {
    React.renderComponent(AdminDashboard(null ), $('#placeholder')[0])
  }
  return {
    "": _adminDashBoard
  }
}());

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

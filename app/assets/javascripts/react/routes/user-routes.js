/**
 * @jsx React.DOM
 */
//= require router/router
//= require react/user-dashboard.react
Router.routes = (function() {
  var _userDashBoard = function() {
    React.renderComponent(UserDashboard(null), $('#user-dashboard')[0])
  }
  return {
    "": _userDashBoard
  }
}());

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

/**
 * @jsx React.DOM
 */
//= require router/router
Router.routes = (function() {
  var _newSubscription = function() {
    console.log("sweet subscriptions");
  }
  return {
    "#new-subscription": _newSubscription
  }
}())

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

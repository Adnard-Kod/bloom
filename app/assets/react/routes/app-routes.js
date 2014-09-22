/**
 * @jsx React.DOM
 */
//= require router/router
//= require react/blooming.react
Router.routes = (function() {
  var _landing = function() {
    React.renderComponent(<Blooming />, $('nav')[0]);
  }
  return {
    "": _landing
  }
}());

$(document).ready(function() {
  Router.route(window.location.hash)
})
$(window).on('hashchange', function() {
  Router.route(window.location.hash);
})

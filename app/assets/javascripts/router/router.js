var Router = (function(){
  var _isFunction = function(object) {
    return object && typeof(object) == 'function';
  }
  return {
    routes: {},
    route: function(location) {
      var locationHandler = this.routes[location];
      if(locationHandler && _isFunction(locationHandler)) return locationHandler();
    }
  }
}());

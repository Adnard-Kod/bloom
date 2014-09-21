//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
var SessionStore = (function () {
  var ActionTypes = BloomingConstants.ActionTypes;
  return {
    getAuthenticityToken: function() {
      return $('meta[name="csrf-token"]')[0].content
    },
    new: function() {
      return {
        email: null,
        password: null
      }
    },
    create: function (loginData) {
      $.ajax({
        type: 'POST',
        url: '/sessions',
        data: {user: loginData}
      })
      .done(function(data) {
        window.location = data.redirect;
      })
      .fail(function(xhr) {
        $(this).trigger('login-error', JSON.parse(xhr.responseText));
      }.bind(this));
    },

    destroy: function (e) {
      var authenticityToken = this.getAuthenticityToken();
      $.ajax({
        type: 'DELETE',
        url: '/sessions',
        data: {authenticity_token: authenticityToken}
      })
      .done(function (data) {
        window.location = data.redirect;
      });
    },
    payload: function(payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CREATE_SESSION:
          this.create(action.data);
          break;
        case ActionTypes.DESTROY_SESSION:
          this.destroy();
          break;
        default:
          // do nothing
      }
    }
  }
}());
BloomingDispatcher.register(SessionStore.payload.bind(SessionStore));

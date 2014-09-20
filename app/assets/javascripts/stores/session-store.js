var SessionStore = (function () {

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
    login: function (loginData) {
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

    logout: function (e) {
      var authenticityToken = this.getAuthenticityToken();
      $.ajax({
        type: 'DELETE',
        url: '/sessions',
        data: {authenticity_token: authenticityToken}
      })
      .done(function (data) {
        window.location = data.redirect;
      });
    }
  }
}());

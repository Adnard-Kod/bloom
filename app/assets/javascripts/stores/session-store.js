var SessionStore = (function () {
  return {
    login: function (loginData) {
      $.ajax({
        type: 'POST',
        url: '/sessions',
        data: loginData
      })
      .done(function(data) {
        window.location = data.redirect;
      })
      .fail(function(xhr) {
        $(this).trigger('login-error', JSON.parse(xhr.responseText));
      }.bind(this));
    },

    logout: function (e) {
      $.ajax({
        type: 'DELETE',
        url: '/sessions'
      })
      .done(function (data) {
        window.location = data.redirect;
      });
    }
  }
}());

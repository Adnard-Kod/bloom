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
      })
    }
  }
}());

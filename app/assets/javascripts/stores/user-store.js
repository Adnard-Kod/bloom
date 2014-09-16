//= require dispatcher

var UserStore = (function () {
  return {
    create: function (userData) {

      $.ajax({
        type: 'POST',
        url: '/users',
        data: userData
      })
      .done(function(data) {
        window.location = data.redirect;
      })
      .fail(function (xhr, status, selse) {
        $(this).trigger('creation-error', JSON.parse(xhr.responseText));
      }.bind(this));
    }
  }
}());

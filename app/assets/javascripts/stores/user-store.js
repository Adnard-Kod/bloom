var UserStore = (function () {
  return {
    new: function() {
      return {
        email: null,
        first_name: null,
        last_name: null,
        phone_number: null,
        password: null,
        password_confirmation: null
      }
    },
    create: function (userData) {

      $.ajax({
        type: 'POST',
        url: '/users',
        data: {user: userData}
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

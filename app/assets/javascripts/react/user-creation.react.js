/** @jsx React.DOM */
//= require react
//= require stores/user-store
//= require actions/user-actions
var UserCreation = React.createClass({displayName: 'UserCreation',
  getInitialState: function () {
    return {
      errors: []
    }
  },

  componentDidMount: function () {
    $(UserStore).on('creation-error', function (e, userCreationErrors) {
      this.setState({
        errors: userCreationErrors.errors
      })
    }.bind(this));
  },

  render: function () {
    var user = this.props.user || UserStore.new();
    var errors = [];
    var formOptions = {
      onSubmit: this.createUser
    };
    return (
      React.DOM.section({id: "user-signup-box"},
        React.DOM.p({id: "user-signup-title"}, "Create An Account"),
        FormFor({object: user, options: formOptions, errors: this.state.errors})
      )
    )
  },

  createUser: function (data) {
    UserActions.createUser(data);
  }
});

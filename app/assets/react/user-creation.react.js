/** @jsx React.DOM */
//= require react
//= require stores/user-store
//= require actions/user-actions
var UserCreation = React.createClass({
  getInitialState: function () {
    return {
      errors: []
    }
  },

  componentDidMount: function () {
    $(UserStore).on('creation-error', function (e, userCreationErrors) {
      if(this.isMounted()) this.setState({ errors: userCreationErrors.errors })
    }.bind(this));
  },

  render: function () {
    var user = this.props.user || UserStore.new();
    var errors = [];
    var formOptions = {
      onSubmit: this.createUser
    };
    return (
      <section id="user-signup-box">
        <p id="user-signup-title">Create An Account</p>
        <FormFor object={user} options={formOptions} errors={this.state.errors} />
      </section>
    )
  },

  createUser: function (data) {
    UserActions.createUser(data);
  }
});

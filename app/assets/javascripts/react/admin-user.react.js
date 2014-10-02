/**
 * @jsx React.DOM
 */
//= require react
//= require stores/user-store
//= require actions/user-actions
//= require react/edit-links.react
var AdminUser = React.createClass({displayName: 'AdminUser',
  render: function() {
    var user = this.props.user;
    // var editForm = this.state.editing ? <AddOnForm addOn={addOn} editing="true"/> :undefined;
    var panelClass = "panel panel-info";
    var editLinks = [
      {handler: this.update, name: 'Admin', className: 'text-warning'},
      {handler: this.delete, name: 'delete', className: 'text-danger'}
    ];
    if(this.props.user.admin) panelClass = 'panel panel-success';
    return (
      React.DOM.div({className: panelClass},
        React.DOM.div({className: "panel-heading"},
          React.DOM.h3({className: "panel-title"},
            user.email,
            EditLinks({links: editLinks})
          )
        ),
        React.DOM.div({className: "panel-body"},
          React.DOM.b(null, user.first_name, " ", user.last_name),
          React.DOM.a({href: "#user-profile/"+user.id}, " view profile")
        )
      )
    );
  },
  delete: function(e) {
    e.preventDefault();
    UserActions.destroyUser(this.props.user.id);
  },
  update: function(e){
    e.preventDefault();
    UserActions.updateUser({id: this.props.user.id, admin: !this.props.user.admin });
  }
})

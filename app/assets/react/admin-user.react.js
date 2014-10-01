/**
 * @jsx React.DOM
 */

//= require react
//= require stores/user-store
//= require actions/user-actions
//= require react/edit-links.react
var AdminUser = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    UserStore.addChangeEvent(function()
    {
      if(this.isMounted()) this.setState({editing:false});
    }.bind(this))
  },
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
      <div className={panelClass}>
        <div className="panel-heading">
          <h3 className="panel-title">
            {user.email}
            <EditLinks links={editLinks} />
          </h3>
        </div>
        <div className="panel-body">
          <b>{user.first_name} {user.last_name}</b>
        </div>
      </div>
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

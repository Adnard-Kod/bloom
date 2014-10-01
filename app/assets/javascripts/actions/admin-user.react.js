/**
 * @jsx React.DOM
 */
//= require react
//= require stores/user-store
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
    var editForm = this.state.editing ? <AddOnForm addOn={addOn} editing="true"/> :undefined;
    var panelClass = "panel panel-info";
    var editLinks = [
      {handler: this.makeAdmin, name: 'Make Admin', className: 'text-warning'},
      {handler: this.edit, name: 'edit', className: 'text-warning'},
      {handler: this.delete, name: 'delete', className: 'text-danger'}
    ];
    if(this.props.user.makeAdmin) panelClass = 'panel panel-success';
    return (
      <div className={panelClass}>
        <div className="panel-heading">
          <h3 className="panel-title">
            {user.first_name user.last_name} ({user.email} )
            <EditLinks links={editLinks} />
          </h3>
        </div>
        // <div className="panel-body">
        //   <b></b>{addOn.description}
        //   {editForm}
        // </div>
      </div>
    );
  },
  delete: function(e) {
    e.preventDefault();
    UserUserActions.destroyUser(this.props.user.id);
  },
  makeAdmin: function(e){
    e.preventDefault();
    UserActions.makeAdmin({id: this.props.addOn.id, Admin: !this.props.user.admin });
  }
})

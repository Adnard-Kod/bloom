/**
 * @jsx React.DOM
 */

//= require react
//= require stores/menu-item-store
//= require react/menu-item-form.react
//= require react/edit-links.react
var MenuItem = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    MenuItemStore.addChangeEvent(function()
    {
      if(this.isMounted()) this.setState({editing:false});
    }.bind(this))
  },
  componentWillUnmount: function() {
    SubscriptionStore.removeChangeEvent(this);
  },

  render: function() {
    var menuItem = this.props.menuItem;
    var editForm = this.state.editing ? <MenuItemForm menuItem={menuItem} editing="true"/> :undefined;
    var panelClass = "panel panel-info";
    var editLinks = [
      {handler: this.edit, name: 'edit', className: 'text-warning'},
      {handler: this.delete, name: 'delete', className: 'text-danger'}
    ];
    if(this.props.active) panelClass = "panel panel-success"
    return (
      <div className={panelClass}>
        <div className="panel-heading">
          <h3 className="panel-title">
            {menuItem.name} ({menuItem.category})
            <EditLinks links={editLinks} />
          </h3>
        </div>
        <div className="panel-body">
          <b></b>{menuItem.description}
          {editForm}
        </div>
      </div>
    );
  },
  edit: function(e) {
    e.preventDefault();
    if(this.isMounted()) this.setState({editing: !this.state.editing});
  },
  delete: function(e) {
    e.preventDefault();
    MenuItemActions.destroyMenuItem(this.props.menuItem.id);
  }
})

/**
 * @jsx React.DOM
 */

//= require react
//= require stores/add-on-store
//= require react/edit-links.react
var AddOn = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    AddOnStore.addChangeEvent(function()
    {
      if(this.isMounted()) this.setState({editing:false});
    }.bind(this))
  },

  render: function() {
    var addOn = this.props.addOn;
    var editForm = this.state.editing ? <MenuItemForm addOn={addOn} editing="true"/> :undefined;
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
            {addOn.name} ({addOn.price})
            <EditLinks links={editLinks} />
          </h3>
        </div>
        <div className="panel-body">
          <b></b>{addOn.description}
          {editForm}
        </div>
      </div>
    );
  },
  edit: function(e) {
    e.preventDefault();
    this.setState({editing: !this.state.editing})
  },
  delete: function(e) {
    e.preventDefault();
    AddOnActions.destroyAddOnItem(this.props.menuItem.id);
  }
})

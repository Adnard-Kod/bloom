/**
 * @jsx React.DOM
 */

//= require react
//= require stores/menu-store
//= require react/menu-form.react
//= require react/edit-links.react
//= require actions/menu-actions
var MenuPanelHeader = React.createClass({
  getInitialState: function() {
    return {
      editing: false,
      errors: []
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({editing: false});
    }.bind(this))
  },

  render: function() {
    var menu = this.props.menu;
    var editForm = this.state.editing ? <MenuForm menu={menu} editing="true"/> : undefined;
    var editLinks = [
      {handler: this.current, name: 'current', className: 'text-warning'},
      {handler: this.edit, name: 'edit', className: 'text-warning'},
      {handler: this.delete, name: 'delete', className: 'text-danger'}
    ];

    return (
      <div className="panel-heading">
        <h3 className="panel-title">
          {menu.title}
          <EditLinks links={editLinks} />
        </h3>
        {editForm}
      </div>
    )
  },
  edit: function(e) {
    e.preventDefault();
    this.setState({editing: !this.state.editing})
  },
  delete: function(e) {
    e.preventDefault();
    MenuActions.destroyMenu(this.props.menu.id);
  },
  current: function(e){
    e.preventDefault();
    MenuActions.currentMenu({id: this.props.menu.id, current: true});
  }
})

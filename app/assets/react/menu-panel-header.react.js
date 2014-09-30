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
    return (
      <div className="panel-heading">
        <h3 className="panel-title">
          {menu.title}
          {this.renderEditLinks()}
        </h3>
        {this.renderEditForm()}
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
    MenuActions.makeMenuCurrent({id: this.props.menu.id, current: true});
  },
  renderEditLinks: function() {
    if (this.props.admin) {
      var editLinks = [
        {handler: this.current, name: 'current', className: 'text-warning'},
        {handler: this.edit, name: 'edit', className: 'text-warning'},
        {handler: this.delete, name: 'delete', className: 'text-danger'}
      ];
      return(<EditLinks links={editLinks} />)
    }
  },
  renderEditForm: function() {
    if (this.props.admin && this.state.editing) return(<MenuForm menu={this.props.menu} editing="true"/>);
  }
})

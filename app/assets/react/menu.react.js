/**
 * @jsx React.DOM
 */

//= require react
//= require stores/menu-store
//= require react/menu-form.react
//= require react/menu-items.react
//= require react/edit-links.react
//= require actions/menu-actions
var Menu = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function()
    {
      if(this.isMounted()) this.setState({editing:false});
    }.bind(this))
  },
  componentWillUnmount: function() {
    SubscriptionStore.removeChangeEvent(this);
  },

  render: function() {
    var menu = this.props.menu;
    var editForm = this.state.editing ? <MenuForm menu={menu} editing="true"/> :undefined;
    var panelClass = "panel panel-default";
    if(this.props.active) panelClass = "panel panel-primary"
    return (
      <div className={panelClass}>
        <div className="panel-heading">
          <h3 className="panel-title">
            {menu.title}
            <EditLinks edit={this.edit} delete={this.delete} />
          </h3>
          {editForm}
        </div>
        <div className="panel-body">
          <MenuItems />
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
    MenuActions.destroyMenu(this.props.menu.id);
  }
})

/**
 * @jsx React.DOM
 */

//= require react
//= require react/menu-panel-header.react
//= require react/menu-item-group.react
var Menu = React.createClass({
  render: function() {
    var panelClass = "panel panel-info";
    if(this.props.menu.current) panelClass = 'panel panel-success';
    if(this.props.active) panelClass = "panel panel-success";
    return (
      <div className={panelClass}>
        {this.transferPropsTo(<MenuPanelHeader />)}
        {this.renderMenuItems()}
      </div>
    );
  },
  renderMenuItems: function() {
    if(this.props.menu.id) return this.transferPropsTo(<MenuItemGroup />);
  }
})

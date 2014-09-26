/**
 * @jsx React.DOM
 */

//= require react
//= require react/menu-panel-header.react
//= require react/menu-item-group.react
var Menu = React.createClass({displayName: 'Menu',
  render: function() {
    // console.log(this.props.menu)
    var panelClass = "panel panel-info";
    if(this.props.menu.current) panelClass = 'panel panel-success';
    if(this.props.active) panelClass = "panel panel-success";
    return (
      React.DOM.div({className: panelClass},
        this.transferPropsTo(MenuPanelHeader(null)),
        this.renderMenuItems()
      )
    );
  },
  renderMenuItems: function() {
    if(this.props.menu.id) return this.transferPropsTo(MenuItemGroup(null));
  }
})

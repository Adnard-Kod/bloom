/**
 * @jsx React.DOM
 */
//= require react
var ListGroupItem = React.createClass({displayName: 'ListGroupItem',
  render: function() {
    var item = this.props.item;
    return (
      React.DOM.div({className: "list-group-item"},
        React.DOM.h4({className: "list-group-item-heading"}, item.name, " ", this.renderEditLinks()),
        React.DOM.p({className: "list-group-item-text"},
          item.description,
          this.renderBadge()
          )
      )
    );
  },
  removeHandler: function(e) {
    e.preventDefault();
    this.props.removeHandler(this.props.id)
  },
  renderEditLinks: function() {
    var itemEditLinks = [];
    if(this.props.admin) {
      itemEditLinks = [
        {handler: this.makeDefault, name: 'make default', className: 'text-ewarning'},
        {handler: this.removeDefault, name: 'remove default', className: 'text-warning'},
        {handler: this.removeItem, name: 'x', className: 'text-danger'}
      ]
      var filter = "remove default";
      if (this.props.default) filter = "make default";
      itemEditLinks = itemEditLinks.filter(function(link) {
        return link.name !== filter;
      });
    } else if(this.props.user) {
      itemEditLinks = [{handler: this.userSelect, name: 'select', className: 'text-warning'}]
      if(this.props.selected) itemEditLinks = [{handler: this.userDeselect, name: 'remove', className: 'text-danger'}]
    }
    return(EditLinks({links: itemEditLinks}))
  },
  renderBadge: function() {
    if(this.props.quantity)
      return(React.DOM.div({className: "badge"}, this.props.quantity))
  },
  makeDefault: function(e) {
    e.preventDefault();
    SelectedItemActions.makeDefault(this.props.id, this.props.item.id)
  },
  removeDefault: function(e) {
    e.preventDefault();
    SelectedItemActions.removeDefault(this.props.id, this.props.item.id)
  },
  removeItem: function(e) {
    e.preventDefault();
    SelectedItemActions.destroySelectedItem(this.props.id, this.props.item.id)
  },
  userSelect: function(e) {
    if(UserSelectedItemStore.selectedItemsCount() === UserSelectedItemStore.maxMeals) return alert("You can only select "+UserSelectedItemStore.maxMeals+" meals. Please remove an item first.")
    e.preventDefault();
    SelectedItemActions.userSelect({menu_item: this.props.item})
  },
  userDeselect: function(e) {
    e.preventDefault();
    SelectedItemActions.userDeselect({menu_item: this.props.item})
  }
});

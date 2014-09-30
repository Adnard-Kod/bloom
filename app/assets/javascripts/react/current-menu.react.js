/** @jsx React.DOM */
//= require react
//= require stores/menu-store
//= require stores/user-selected-item-store
//= require react/menu.react
var CurrentMenu = React.createClass({displayName: 'CurrentMenu',
  getInitialState: function() {
    return {
      menu: {},
      selectedItems: {}
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function(e, data) {
      this.setState({menu: data.menu, selectedItems: data.selected_items })
      UserSelectedItemStore.setSelectedItems(data.selected_items);
    }.bind(this))
    MenuStore.getCurrentMenu();
    UserSelectedItemStore.addChangeEvent(function() {
      this.setState({selectedItems: UserSelectedItemStore.selectedItems() })
    }.bind(this))
  },
  render: function () {
    return (
      React.DOM.div(null,
        React.DOM.div({className: "col-lg-6"},
          React.DOM.h3(null, "This Week's Menu"),
          Menu({menu: this.state.menu, user: true})
        ),
        React.DOM.div({className: "col-lg-6"},
          React.DOM.h3(null, "Your Selected Meals"),
          this.renderDefaultSelectedItems()
        )
      )
    )
  },
  renderDefaultSelectedItems: function() {
    if(this.state.menu.id) {
      return(MenuItemGroup({menu: {selected_items: this.state.selectedItems}, user: true, selected: true}));
    }
  },
});

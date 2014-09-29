/** @jsx React.DOM */
//= require react
//= require stores/menu-store
//= require react/menu.react
var CurrentMenu = React.createClass({displayName: 'CurrentMenu',
  getInitialState: function() {
    return {
      menu: {}
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function() {
      this.setState({menu: MenuStore.currentMenu()})
    }.bind(this))
    MenuStore.all();
  },
  render: function () {
    return (
      React.DOM.div(null,
        React.DOM.div({className: "col-lg-6"},
          React.DOM.h3(null, "This Week's Menu"),
          Menu({menu: this.state.menu})
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
      var selectedItems = this.state.menu.selected_items.filter(function(item) {
        return item.default;
      });
      return(ListGroup({list: selectedItems}));
    }
  },
});

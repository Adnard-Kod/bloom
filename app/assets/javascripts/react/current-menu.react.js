/** @jsx React.DOM */
//= require react
//= require stores/menu-store
//= require stores/user-selected-item-store
//= require react/menu.react
//= require react/alert.react
//= require react/progress-bar.react
var CurrentMenu = React.createClass({displayName: 'CurrentMenu',
  getInitialState: function() {
    return {
      menu: {},
      selectedItems: []
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function(e, data) {
      this.setState({menu: data.menu, selectedItems: data.selected_items, maxMeals: data.max_meals })
      UserSelectedItemStore.setSelectedItems(data.selected_items);
      UserSelectedItemStore.maxMeals = data.max_meals;
    }.bind(this))
    MenuStore.getCurrentMenu();
    UserSelectedItemStore.addChangeEvent(function(e, message) {
      this.setState({selectedItems: UserSelectedItemStore.selectedItems(), message: message })
    }.bind(this))
  },
  render: function () {
    return (
      React.DOM.div(null,
        ProgressBar({min: 0, max: this.state.maxMeals, value: this.currentMealsSelected()}),
        this.renderSuccessMessage(),
        React.DOM.div({className: "col-lg-6"},
          React.DOM.h3(null, "This Week's Menu"),
          Menu({menu: this.state.menu, user: true})
        ),
        React.DOM.div({className: "col-lg-6"},
          React.DOM.h3(null, "Your Selected Meals"),
          this.renderDefaultSelectedItems(),
          React.DOM.a({className: "col-lg-12 btn btn-success", onClick: this.saveUserSelection}, "Save Your Selected Meals")
        )
      )
    )
  },
  renderDefaultSelectedItems: function() {
    if(this.state.menu.id) {
      return(MenuItemGroup({menu: {selected_items: this.state.selectedItems}, user: true, selected: true}));
    }
  },
  saveUserSelection: function(e) {
    var currentCount = UserSelectedItemStore.selectedItemsCount();
    var maxCount = UserSelectedItemStore.maxMeals;
    if(currentCount < maxCount) return alert("You must select "+maxCount+" meals. Please add " + (maxCount - currentCount) + " more meals.")
    e.preventDefault();
    SelectedItemActions.saveUserSelectedItems();
  },
  renderSuccessMessage: function() {
    if(this.state.message) return(Alert({message: this.state.message}))
  },
  currentMealsSelected: function() {
    return UserSelectedItemStore.selectedItemsCount();
  }
});

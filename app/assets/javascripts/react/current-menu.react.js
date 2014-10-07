/** @jsx React.DOM */
//= require react
//= require stores/menu-store
//= require stores/user-selected-item-store
//= require react/menu.react
//= require react/alert.react
//= require react/progress-bar.react
//= require react/form-builder/form-for.react
//= require stores/session-store
//= require react/button-group.react
var CurrentMenu = React.createClass({displayName: 'CurrentMenu',
  getInitialState: function() {
    return {
      menu: {},
      selectedItems: []
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function(e, data) {
      if(this.isMounted()) {
        UserSelectedItemStore.setSelectedItems(data.selected_items);
        UserSelectedItemStore.setMealCombos(data.meals_combo);
        this.setState({menu: data.menu, selectedItems: data.selected_items, entreeCount: UserSelectedItemStore.currentCombo.entrees, sideCount: UserSelectedItemStore.currentCombo.sides });
      }
    }.bind(this))
    MenuStore.getCurrentMenu();
    UserSelectedItemStore.addChangeEvent(function(e, message) {
      if(this.isMounted()) {
        this.setState({selectedItems: UserSelectedItemStore.allItems(), message: message, entreeCount: UserSelectedItemStore.currentCombo.entrees, sideCount: UserSelectedItemStore.currentCombo.sides });
      }
    }.bind(this))
  },
  render: function () {
    return (
      React.DOM.div(null,
        this.renderComboSelection(),
        React.DOM.div({className: "col-lg-6"},
          React.DOM.h3(null, "This Week's Menu"),
          Menu({menu: this.state.menu, user: true})
        ),
        this.renderUserSelectedItems()
      )
    )
  },
  renderComboSelection: function() {
    var combos = [];
    UserSelectedItemStore.mealCombos.forEach(function(combo) {
      var comboString = combo.entrees + " Entrees and " + combo.sides + " Sides";
      combos.push({name: comboString, handler: this.selectedCombo, id: combo.id})
    }.bind(this));
    return(ButtonGroup({buttons: combos}));
  },
  selectedCombo: function(e) {
    e.preventDefault();
    UserSelectedItemStore.clearSelectedItems();
    UserSelectedItemStore.setCurrentCombo(parseInt(e.target.dataset.id));
  },
  renderUserSelectedItems: function() {
    if(SessionStore.currentUser.active_memberships.length === 0) return;
    return(
      React.DOM.div({className: "col-lg-6"},
        ProgressBar({title: "Number of Entrees", min: 0, max: this.state.entreeCount, value: this.currentMealsSelected("Entree")}),
        ProgressBar({title: "Number of Side Dishes", min: 0, max: this.state.sideCount, value: this.currentMealsSelected("Side Dish")}),
        this.renderSuccessMessage(),
        React.DOM.h3(null, "Your Selected Meals"),
        this.renderDefaultSelectedItems(),
        React.DOM.a({className: "col-lg-12 btn btn-success", onClick: this.saveUserSelection}, "Save Your Selected Meals")
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
    if(currentCount < maxCount) return alert("You must select "+maxCount+" meals. Please add " + (maxCount - currentCount) + " more menu items.")
    e.preventDefault();
    SelectedItemActions.saveUserSelectedItems();
  },
  renderSuccessMessage: function() {
    if(this.state.message) return(Alert({message: this.state.message}))
  },
  currentMealsSelected: function(category) {
    return UserSelectedItemStore.selectedItemsCount(category);
  }
});

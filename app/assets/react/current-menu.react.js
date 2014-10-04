/** @jsx React.DOM */
//= require react
//= require stores/menu-store
//= require stores/user-selected-item-store
//= require react/menu.react
//= require react/alert.react
//= require react/progress-bar.react
//= require stores/session-store
var CurrentMenu = React.createClass({
  getInitialState: function() {
    return {
      menu: {},
      selectedItems: []
    };
  },
  componentDidMount: function() {
    MenuStore.addChangeEvent(function(e, data) {
      if(this.isMounted()) {
        this.setState({menu: data.menu, selectedItems: data.selected_items, maxMeals: data.max_meals })
        UserSelectedItemStore.setSelectedItems(data.selected_items);
        UserSelectedItemStore.maxMeals = data.max_meals;
      }
    }.bind(this))
    MenuStore.getCurrentMenu();
    UserSelectedItemStore.addChangeEvent(function(e, message) {
      if(this.isMounted()) {
        this.setState({selectedItems: UserSelectedItemStore.allItems(), message: message })
      }
    }.bind(this))
  },
  render: function () {
    return (
      <div>
        <div className="col-lg-6">
          <h3>{"This Week's Menu"}</h3>
          <Menu menu={this.state.menu} user={true} />
        </div>
        {this.renderUserSelectedItems()}
      </div>
    )
  },
  renderUserSelectedItems: function() {
    if(SessionStore.currentUser.active_memberships.length === 0) return;
    return(
      <div className="col-lg-6">
        <ProgressBar min={0} title="Number of Entrees" max={this.state.maxMeals/2} value={this.currentMealsSelected("Entree")} />
        <ProgressBar title="Number of Side Dishes" min={0} max={this.state.maxMeals/2} value={this.currentMealsSelected("Side Dish")} />
        {this.renderSuccessMessage()}
        <h3>Your Selected Meals</h3>
        {this.renderDefaultSelectedItems()}
        <a className='col-lg-12 btn btn-success' onClick={this.saveUserSelection}>Save Your Selected Meals</a>
      </div>
    )
  },
  renderDefaultSelectedItems: function() {
    if(this.state.menu.id) {
      return(<MenuItemGroup menu={{selected_items: this.state.selectedItems}} user={true} selected={true}/>);
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
    if(this.state.message) return(<Alert message={this.state.message}/>)
  },
  currentMealsSelected: function(category) {
    return UserSelectedItemStore.selectedItemsCount(category);
  }
});

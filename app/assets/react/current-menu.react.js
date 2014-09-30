/** @jsx React.DOM */
//= require react
//= require stores/menu-store
//= require stores/user-selected-item-store
//= require react/menu.react
//= require react/alert.react
var CurrentMenu = React.createClass({
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
    UserSelectedItemStore.addChangeEvent(function(e, message) {
      this.setState({selectedItems: UserSelectedItemStore.selectedItems(), message: message })
    }.bind(this))
  },
  render: function () {
    return (
      <div>
        {this.renderSuccessMessage()}
        <div className="col-lg-6">
          <h3>{"This Week's Menu"}</h3>
          <Menu menu={this.state.menu} user={true} />
        </div>
        <div className="col-lg-6">
          <h3>Your Selected Meals</h3>
          {this.renderDefaultSelectedItems()}
          <a className='col-lg-12 btn btn-primary' onClick={this.saveUserSelection}>Save</a>
        </div>
      </div>
    )
  },
  renderDefaultSelectedItems: function() {
    if(this.state.menu.id) {
      return(<MenuItemGroup menu={{selected_items: this.state.selectedItems}} user={true} selected={true} />);
    }
  },
  saveUserSelection: function(e) {
    e.preventDefault();
    SelectedItemActions.saveUserSelectedItems();
  },
  renderSuccessMessage: function() {
    if(this.state.message) return(<Alert message={this.state.message}/>)
  }
});

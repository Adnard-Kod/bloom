/** @jsx React.DOM */
//= require react
//= require stores/menu-store
//= require react/menu.react
var CurrentMenu = React.createClass({
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
      <div>
        <div className="col-lg-6">
          <h3>{"This Week's Menu"}</h3>
          <Menu menu={this.state.menu} />
        </div>
        <div className="col-lg-6">
          <h3>Your Selected Meals</h3>
          {this.renderDefaultSelectedItems()}
        </div>
      </div>
    )
  },
  renderDefaultSelectedItems: function() {
    if(this.state.menu.id) {
      var selectedItems = this.state.menu.selected_items.filter(function(item) {
        return item.default;
      });
      return(<ListGroup list={selectedItems} />);
    }
  },
});

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
        <h3>{"This Week's Menu"}</h3>
        <Menu menu={this.state.menu} />
      </div>
    )
  }
});

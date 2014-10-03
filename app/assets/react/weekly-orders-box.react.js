/** @jsx React.DOM */
//= require react
//= require stores/user-selected-item-store
//= require react/tabs/togglable-tabs.react
//= require react/weekly-by-user.react
//= require react/order-quantity.react

var WeeklyOrdersBox = React.createClass({
  getInitialState: function() {
    return {
      weeklyOrders: UserSelectedItemStore.selectedItems()
    };
  },
  componentDidMount: function() {
    UserSelectedItemStore.addChangeEvent(function() {
      if(this.isMounted()) {
        this.setState({
          weeklyOrders: UserSelectedItemStore.selectedItems()
        });
      }
    }.bind(this))
    UserSelectedItemStore.weeklyItems()
  },
  renderOrderQuantity: function(){
    var orderQuantity = []
    var orders = this.state.weeklyOrders.weekly_orders
    if (orders){
      orders.forEach(function(order){
        orderQuantity.push(<OrderQuantity order={order} />)
      }.bind(this))
    }
    return orderQuantity
  },
  renderWeeklyByUser: function(){
    var userOrders = []
    var orders = this.state.weeklyOrders.weekly_by_user
    if (orders){
      orders.forEach(function(user){
        userOrders.push(<WeeklyByUser user={user} />)
      }.bind(this))
    }
    return userOrders
  },
  render:function(){
    var tabs = [ { href: 'total-items', name: 'Total Items' },
                 { href: 'user-orders', name: 'User Orders' }];
    var tabContents = [
                        { id: 'total-items', content: this.renderOrderQuantity() },
                        { id: 'user-orders', content: this.renderWeeklyByUser() }];
   return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader title="Weekly Orders" />
          </div>
        </div>
          <TogglableTabs tabs={tabs} tabContents={tabContents} />
      </div>
    )
  }
})




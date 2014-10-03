/** @jsx React.DOM */
//= require react
//= require stores/user-selected-item-store
//= require react/tabs/togglable-tabs.react
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
    this.state.weeklyOrders.forEach(function(order){
      orderQuantity.push(<OrderQuantity order={order} />)
    }.bind(this))
    return orderQuantity
  },
  render:function(){
    var tabs = [ { href: 'user-orders', name: 'User Orders' },
                 { href: 'total-items', name: 'Total Items' }];
    var tabContents = [ { id: 'user-orders', content: "hello" },
                        { id: 'total-items', content: this.renderOrderQuantity() }];
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




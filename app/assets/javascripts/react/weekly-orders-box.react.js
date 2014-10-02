/** @jsx React.DOM */
//= require react
//= require stores/user-selected-item-store
//= require react/tabs/togglable-tabs.react
//= require react/order-quantity.react

var WeeklyOrdersBox = React.createClass({displayName: 'WeeklyOrdersBox',
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
      orderQuantity.push(OrderQuantity({order: order}))
    }.bind(this))
    return orderQuantity
  },
  render:function(){
    var tabs = [ { href: 'amount', name: 'Amount' },
                 { href: 'weeklyOrders', name: 'Weekly Orders' }];
    var tabContents = [ { id: 'amount', content: this.renderOrderQuantity() },
                        { id: 'weeklyOrders', content: "eiko" }];
   return (
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            PageHeader({title: "Orders"})
          )
        ),
          TogglableTabs({tabs: tabs, tabContents: tabContents})
      )
    )
  }
})




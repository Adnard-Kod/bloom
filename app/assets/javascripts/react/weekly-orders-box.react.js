/** @jsx React.DOM */
//= require react
//= require stores/user-selected-item-store

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
  render:function(){
   return (
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            PageHeader({title: "Weekly Order"}),
            BreadCrumb({crumbs: ["Weekly Order Management", "Weekly Orders"]})
          )
        ),
          React.DOM.h1(null, " you did it "),
            React.DOM.hr(null)
      )
    )
  }
})




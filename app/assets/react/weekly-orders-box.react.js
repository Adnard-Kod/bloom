/** @jsx React.DOM */
//= require react
//= require stores/user-selected-item-store

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
  render:function(){
   return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader title="Weekly Order" />
            <BreadCrumb crumbs={["Weekly Order Management", "Weekly Orders"]}/>
          </div>
        </div>
          <h1> you did it </ h1>
            <hr />
      </div>
    )
  }
})




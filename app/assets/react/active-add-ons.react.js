/**
 * @jsx React.DOM
 */
 // require react
//= require stores/add-on-store
//= require react/active-add-on.react

var ActiveAddOns = React.createClass({
  getInitialState: function() {
    return {
      addOns: AddOnStore.addOns()
    };
  },
  componentDidMount: function() {
    AddOnStore.addChangeEvent(function(){
      this.setState({ addOns: AddOnStore.addOns()})
    }.bind(this))
    AddOnStore.active()
  },
  render: function() {
    var addOns = []
    this.state.addOns.forEach(function(item){
      addOns.push(<ActiveAddOn key={item.id} addOn={item} />)
      })
    return (
      <div className="add-ons">
        {addOns}
      </div>
    );
  }
});


/** @jsx React.DOM */
//= require react
//= require stores/add-on-store
//= require react/add-on.react

var AddOns = React.createClass({displayName: 'AddOns',
  getInitialState: function() {
    return {
      addOns: AddOnStore.addOns()
    };
  },
  componentDidMount: function() {
    AddOnStore.addChangeEvent(function() {
      if(this.isMounted()) {
        this.setState({
          addOns: AddOnStore.addOns()
        });
      }
    }.bind(this))
    AddOnStore.all()
  },
  render:function(){
    var addOns = []
    this.state.addOns.forEach(function(item){
      addOns.push(AddOn({key: item.id, addOn: item}))
    })
    return (
      React.DOM.div({className: "add-ons"},
        addOns
      )
    )
  }
})

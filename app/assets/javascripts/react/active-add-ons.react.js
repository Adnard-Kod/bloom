/**
 * @jsx React.DOM
 */
 // require react
//= require stores/add-on-store
//= require react/active-add-on.react
//= require react/purchase-add-ons.react

var ActiveAddOns = React.createClass({displayName: 'ActiveAddOns',
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
      addOns.push(ActiveAddOn({key: item.id, addOn: item}))
      })
    return (
      React.DOM.div({className: "col-lg-6"},
        React.DOM.h3(null, "Add On Options"),
        React.DOM.div({className: "add-ons"},
          addOns,
          PurchaseAddOn({addOn: this.state.addOns})
        )
      )
    );
  }
});


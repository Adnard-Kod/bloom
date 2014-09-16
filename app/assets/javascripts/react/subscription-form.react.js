/**
 * @jsx React.DOM
 */
 //= require react
 //= require stores/subscription-store
var SubscriptionForm = React.createClass({displayName: 'SubscriptionForm',
  MEAL_OPTIONS: [6, 12, 18],
  WEEK_OPTIONS: [12, 24, 36],
  render: function() {
    return (
      React.DOM.form( {onSubmit:this.createSubscription}, 
        React.DOM.input( {ref:"price", type:"text", placeholder:"Price"} ),
          this.renderMealSelect(),
          this.renderWeekSelect(),
        React.DOM.textarea( {ref:"description", placeholder:"Description"} ),
        React.DOM.input( {type:"submit", value:"Create Subscription"} )
      )
    );
  },
  renderMealSelect: function() {
    var meals = [];
    this.MEAL_OPTIONS.forEach(function(opt) {
      meals.push(React.DOM.option( {value:opt}, opt));
    })
    return (
      React.DOM.select( {ref:"meals", name:"meals"}, 
        meals
      )
    )
  },
  renderWeekSelect: function() {
    var weeks = [];
    this.WEEK_OPTIONS.forEach(function(opt) {
      weeks.push(React.DOM.option( {value:opt}, opt));
    })
    return (
      React.DOM.select( {ref:"weeks", name:"weeks"}, 
        weeks
      )
    )
  },
  createSubscription: function(e) {
    e.preventDefault();
    var data = {};
    Object.keys(this.refs).forEach(function(ref) {
      var value = this.refs[ref].getDOMNode().value;
      data[ref] = value;
    }.bind(this))
    SubscriptionStore.create(data);
  }
})

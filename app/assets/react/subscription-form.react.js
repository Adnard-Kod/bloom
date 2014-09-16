/**
 * @jsx React.DOM
 */
 //= require react
 //= require stores/subscription-store
var SubscriptionForm = React.createClass({
  MEAL_OPTIONS: [6, 12, 18],
  WEEK_OPTIONS: [12, 24, 36],
  render: function() {
    return (
      <form onSubmit={this.createSubscription}>
        <input ref="price" type="text" placeholder="Price" />
          {this.renderMealSelect()}
          {this.renderWeekSelect()}
        <textarea ref="description" placeholder="Description" />
        <input type="submit" value="Create Subscription" />
      </form>
    );
  },
  renderMealSelect: function() {
    var meals = [];
    this.MEAL_OPTIONS.forEach(function(opt) {
      meals.push(<option value={opt}>{opt}</option>);
    })
    return (
      <select ref="meals" name="meals">
        {meals}
      </select>
    )
  },
  renderWeekSelect: function() {
    var weeks = [];
    this.WEEK_OPTIONS.forEach(function(opt) {
      weeks.push(<option value={opt}>{opt}</option>);
    })
    return (
      <select ref="weeks" name="weeks">
        {weeks}
      </select>
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

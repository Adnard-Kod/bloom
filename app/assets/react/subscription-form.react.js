/**
 * @jsx React.DOM
 */
 //= require react
 //= require stores/subscription-store
var SubscriptionForm = React.createClass({
  MEAL_OPTIONS: [6, 12, 18],
  WEEK_OPTIONS: [12, 24, 36],
  getInitialState: function() {
    return {
      errors: []
    };
  },
  componentDidMount: function() {
    SubscriptionStore.addFailToCreateEvent(function(e, data) {
      this.setState({errors: data});
    }.bind(this))
    SubscriptionStore.addChangeEvent(function() {
      this.setState({errors: []});
    }.bind(this))
  },
  render: function() {
    return (
      <form onSubmit={this.createSubscription}>
        {this.renderErrors()}
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
  renderErrors: function() {
    var errors = [];
    this.state.errors.forEach(function(err) {
      errors.push(<li>{err}</li>)
    })
    return (
      <ul className="form-errors">{errors}</ul>
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

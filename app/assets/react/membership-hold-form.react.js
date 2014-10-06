/**
 * @jsx React.DOM
 */
//= require react
//= require react/form-builder/form-for.react

var MembershipHoldForm = React.createClass({
  getDefaultProps: function() {
    return {
      errors: []
    };
  },
  render: function() {
    var formOptions = {
      name: "Hold Dates",
      submit: { value: "Hold Membership" },
      holdDates: { type: 'select', values: this.holdDates() },
      maxWeeks: { type: 'select', values: this.maxWeeks() },
      onSubmit: this.props.holdMembership
    };
    var object = {  holdDates: this.props.holdInfo.date_options[0],
                    maxWeeks: this.maxWeeks()[0].value };
    return (
      <FormFor object={object} options={formOptions} errors={this.props.errors} />
    );
  },

  holdDates: function() {
    return this.props.holdInfo.date_options.map(function(date) {
      return { value: date, show: date };
    });
  },

  maxWeeks: function() {
    var maxWeeks = this.props.holdInfo.max_hold_weeks;
    var maxWeeksArray = new Array(maxWeeks);
    for(var i = 0; i < maxWeeks; i ++) {
      maxWeeksArray[i] = { value: i + 1, show: i + 1 };
    }
    return maxWeeksArray;
  }
})

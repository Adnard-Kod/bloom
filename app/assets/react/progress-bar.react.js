/**
 * @jsx React.DOM
 */
//= require react
var ProgressBar = React.createClass({
  getDefaultProps: function() {
    return {
      max: 0,
      min: 0,
      value: 0
    };
  },
  render: function() {
    return (
      <div className="progress">
        <div className="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow={this.props.value} aria-valuemin={this.props.min} aria-valuemax={this.props.max} style={{width: this.precentageDone() + '%'}}>
          {"You need to select " + this.amountLeft() + " more!"}
        </div>
      </div>
    );
  },
  precentageDone: function() {
    return this.props.value/this.props.max * 100;
  },
  amountLeft: function() {
    return this.props.max - this.props.value;
  }

});

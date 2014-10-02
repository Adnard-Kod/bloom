/**
 * @jsx React.DOM
 */
//= require react

var TabContent = React.createClass({
  render: function() {
    var tabContent = this.props.tabContent;
    var classes = 'tab-pane ' + this.props.active;
    return (
      <div className={classes} id={tabContent.id}>
        {tabContent.content}
      </div>
    );
  }
});

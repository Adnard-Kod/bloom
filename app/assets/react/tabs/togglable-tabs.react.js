/**
 * @jsx React.DOM
 */
//= require react
//= require react/tabs/tablist.react
//= require react/tabs/tab-contents.react

var TogglableTabs = React.createClass({
  render: function() {
    return (
      <div>
        <Tablist tabs={this.props.tabs} />
        <TabContents tabContents={this.props.tabContents} />
      </div>
    );
  }
});

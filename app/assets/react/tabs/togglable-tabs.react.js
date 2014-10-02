/**
 * @jsx React.DOM
 */
//= require react
//= require react/tabs/tablist.react
//= require react/tabs/tab-content.react

var TogglableTabs = React.createClass({
  render: function() {
    return (
      <div>
        <Tablist />
        <TabContent />
      </div>
    );
  }
});

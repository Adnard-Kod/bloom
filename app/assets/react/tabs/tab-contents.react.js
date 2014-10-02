/**
 * @jsx React.DOM
 */
//= require react
//= require react/tabs/tab-content.react

var TabContents = React.createClass({
  render: function() {
    var contents = [];
    this.props.tabContents.forEach(function(content, index) {
      if(index === 0) var classActive = 'active';
      contents.push(<TabContent active={classActive} tabContent={content} />);
    }.bind(this));
    return (
      <div className="tab-content">
        {contents}
      </div>
    );
  }
})

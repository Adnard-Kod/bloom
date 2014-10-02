/**
 * @jsx React.DOM
 */
//= require react

var Tab = React.createClass({

  render: function() {
    var tab = this.props.tab;
    var href = '#' + tab.href;
    return (
      <li className={this.props.active}>
        <a href={href} role="tab" data-toggle="tab">
          {tab.name}
        </a>
      </li>
    );
  }
});

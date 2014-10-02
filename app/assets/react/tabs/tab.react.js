/**
 * @jsx React.DOM
 */
//= require react

var Tab = React.createClass({

  render: function() {
    var tab = this.props.tab;
    var href = '#' + tab.href;
    return (
      <li>
        <a className={this.props.active} href={href} role="tab" data-toggle="tab">
          {tab.name}
        </a>
      </li>
    );
  }
});

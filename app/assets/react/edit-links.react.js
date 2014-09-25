/**
 * @jsx React.DOM
 */
//= require react

var EditLinks = React.createClass({
  render: function() {
    var links = [];
    this.props.links.forEach(function(link, panel, i) {
      var className = link.className || 'text-default';
      links.push(<strong><a href="#" className={className} onClick={link.handler}> {link.name} </a></strong>);
    })
    return (
      <span>
        {links}
      </span>
    );
  }
});


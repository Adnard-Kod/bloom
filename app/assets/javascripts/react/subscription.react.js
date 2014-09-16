/**
 * @jsx React.DOM
 */
 var Subscription = React.createClass({displayName: 'Subscription',
  render: function() {
    var sub = this.props.sub;
    return (
      React.DOM.li(null, 
        sub.name,": ", sub.description, " for $",sub.price
      )
    );
  }
 })

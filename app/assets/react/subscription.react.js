/**
 * @jsx React.DOM
 */
 var Subscription = React.createClass({
  render: function() {
    var sub = this.props.sub;
    return (
      <li>
        {sub.name}: {sub.description} for ${sub.price}
      </li>
    );
  }
 })

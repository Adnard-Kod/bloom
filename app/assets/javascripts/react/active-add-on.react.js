/**
 * @jsx React.DOM
 */
//= require react
var ActiveAddOn = React.createClass({displayName: 'ActiveAddOn',

  render: function() {
    var addOn = this.props.addOn;
    var panelClass = "panel panel-info";
    return (
      React.DOM.div({className: panelClass},
        React.DOM.div({className: "panel-heading"},
          React.DOM.h3({className: "panel-title"},
            addOn.name, " (", addOn.price, ")"
          )
        ),
        React.DOM.div({className: "panel-body"},
          React.DOM.b(null), addOn.description
        )
      )
    );
  }

});


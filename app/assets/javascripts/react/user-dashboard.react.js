/** @jsx React.DOM */
//= require react
//= require react/current-menu.react
//= require react/active-add-ons.react
var UserDashboard = React.createClass({displayName: 'UserDashboard',
  render: function () {
    return (
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            CurrentMenu(null),
            ActiveAddOns(null)
          )
        )
      )
    )
  }
});

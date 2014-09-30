/** @jsx React.DOM */
//= require react
//= require react/current-menu.react
//= require react/active-add-ons.react

var UserDashboard = React.createClass({displayName: 'UserDashboard',
  render: function () {
    return (
<<<<<<< HEAD
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            CurrentMenu(null)
          )
        )
=======
      React.DOM.div(null,
        CurrentMenu(null),
        ActiveAddOns(null)
>>>>>>> add activeAddOn component
      )
    )
  }
});

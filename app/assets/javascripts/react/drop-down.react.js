/**
 * @jsx React.DOM
 */
//= require react

var DropDown = React.createClass({displayName: 'DropDown',
  render: function() {
    return (
      React.DOM.div({className: "dropdown"},
        React.DOM.button({className: "btn btn-default dropdown-toggle", type: "button", id: "dropdownMenu1", 'data-toggle': "dropdown"},
          "Dropdown",
          React.DOM.span({className: "caret"})
        ),
        React.DOM.ul({className: "dropdown-menu", role: "menu", 'aria-labelledby': "dropdownMenu1"},
          React.DOM.li({role: "presentation"}, React.DOM.a({role: "menuitem", tabindex: "-1", href: "#"}, "Action")),
          React.DOM.li({role: "presentation"}, React.DOM.a({role: "menuitem", tabindex: "-1", href: "#"}, "Another action")),
          React.DOM.li({role: "presentation"}, React.DOM.a({role: "menuitem", tabindex: "-1", href: "#"}, "Something else here")),
          React.DOM.li({role: "presentation", className: "divider"}),
          React.DOM.li({role: "presentation"}, React.DOM.a({role: "menuitem", tabindex: "-1", href: "#"}, "Separated link"))
        )
      )
    );
  }

});

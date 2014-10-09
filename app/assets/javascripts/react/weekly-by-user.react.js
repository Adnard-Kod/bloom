/**
 * @jsx React.DOM
 */
//= require react
//= require react/weekly-orders-by-user.react.js

var WeeklyByUser= React.createClass({displayName: 'WeeklyByUser',
  render: function() {
    var items = this.props.user.menu_items;
    var menuItems = [ ]
    items.forEach(function(item){
      menuItems.push(WeeklyOrdersByUser({item: item}))
    })
    var user = this.props.user;
    return (
      React.DOM.div(null,
        React.DOM.ul({className: "list-group"},
          React.DOM.li({className: "list-group-item"},
            React.DOM.p(null, React.DOM.b(null, "Name: "), user.name),
            React.DOM.p(null, React.DOM.b(null, "Phone Number: "), user.phone_number),
            React.DOM.p(null, React.DOM.b(null, "Address: "), user.address.full),
            React.DOM.p(null, React.DOM.b(null, "Delivery Instructions: "), user.address.delivery_instructions),
            React.DOM.ul({className: "list-group"},
              React.DOM.li({className: "list-group-item"},
                React.DOM.p(null, React.DOM.b(null, "Menu Items For the Week:")),
                React.DOM.p(null, menuItems)
              )
            )
          )
        )
      )
    );
  }
});

/**
 * @jsx React.DOM
 */
//= require react
//= require react/weekly-orders-by-user.react.js

var WeeklyByUser= React.createClass({
  render: function() {
    var items = this.props.user.menu_items;
    var menuItems = [ ]
    items.forEach(function(item){
      menuItems.push(<WeeklyOrdersByUser item={item} />)
    })
    var user = this.props.user;
    return (
      <div>
        <ul className="list-group">
          <li className="list-group-item">
            <p>{user.name}</p>
            <p>{user.address}</p>
            <ul className="list-group">
              <li className="list-group-item">
                <p><b>Menu Items For the Week:</b></p>
                <p>{menuItems}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});

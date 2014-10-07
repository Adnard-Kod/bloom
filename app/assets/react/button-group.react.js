/**
 * @jsx React.DOM
 */
//= require react
var ButtonGroup = React.createClass({
  render: function() {
    var buttons = [];
    this.props.buttons.forEach(function(button) {
      buttons.push(<button key={button.id} data-id={button.id} type="button" onClick={button.handler} className="btn btn-default">{button.name}</button>);
    })
    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }

});

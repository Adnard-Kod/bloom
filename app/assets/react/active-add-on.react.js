/**
 * @jsx React.DOM
 */
//= require react
var ActiveAddOn = React.createClass({

  render: function() {
    var addOn = this.props.addOn;
    var panelClass = "panel panel-info";
    return (
      <div className={panelClass}>
        <div className="panel-heading">
          <h3 className="panel-title">
            {addOn.name} ({addOn.price})
          </h3>
        </div>
        <div className="panel-body">
          <b>{addOn.description}</b>
        </div>
      </div>
    );
  }

});


/**
 * @jsx React.DOM
 */

//= require react
//= require stores/add-on-store
//= require react/edit-links.react
var AddOn = React.createClass({displayName: 'AddOn',
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    AddOnStore.addChangeEvent(function()
    {
      if(this.isMounted()) this.setState({editing:false});
    }.bind(this))
  },

  render: function() {
    var addOn = this.props.addOn;
    var editForm = this.state.editing ? AddOnForm({addOn: addOn, editing: "true"}) :undefined;
    var panelClass = "panel panel-info";
    var editLinks = [
      {handler: this.active, name: 'active', className: 'text-warning'},
      {handler: this.edit, name: 'edit', className: 'text-warning'},
      {handler: this.delete, name: 'delete', className: 'text-danger'}
    ];
    if(this.props.addOn.active) panelClass = 'panel panel-success';
    return (
      React.DOM.div({className: panelClass},
        React.DOM.div({className: "panel-heading"},
          React.DOM.h3({className: "panel-title"},
            addOn.name, " ( $", addOn.price, " )",
            EditLinks({links: editLinks})
          )
        ),
        React.DOM.div({className: "panel-body"},
          React.DOM.b(null), addOn.description,
          editForm
        )
      )
    );
  },
  edit: function(e) {
    e.preventDefault();
    if(this.isMounted()) this.setState({editing: !this.state.editing})
  },
  delete: function(e) {
    e.preventDefault();
    AddOnActions.destroyAddOn(this.props.addOn.id);
  },
  active: function(e){
    e.preventDefault();
    AddOnActions.updateAddOn({id: this.props.addOn.id, active: !this.props.addOn.active });
  }
})

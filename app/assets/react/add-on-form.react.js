/**
 * @jsx React.DOM
 */
//= require react
//= require stores/add-on-store
//= require react/form-builder/form-for.react
//= require actions/add-on-actions

var AddOnForm = React.createClass({
  getInitialState: function() {
    return {
      errors: []
    };
  },
  componentDidMount: function() {
    AddOnStore.addFailToTakeAction(function(e, data) {
      if(this.isMounted()) this.setState({errors: data});
    }.bind(this))
    AddOnStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({errors: []});
    }.bind(this))
  },
  componentWillUnmount: function() {
    AddOnStore.removeChangeEvent(this);
    AddOnStore.removeFailToTakeAction(this);
  },
  render: function() {
    var addOn = this.props.addOn || AddOnStore.new();
    var formOptions = {
      name: "Add On Item",
      onSubmit: this.handleSubmit
    }
    return (
      <div>
        <FormFor object={addOn} options={formOptions} errors={this.state.errors}/>
      </div>
    );
  },
  handleSubmit: function(data) {
    if(this.props.editing) {
      AddOnActions.updateAddOn(data)
    } else {
      AddOnActions.createAddOn(data)
    }
  }
})

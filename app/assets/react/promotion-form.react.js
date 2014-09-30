/**
 * @jsx React.DOM
 */
//= require react
//= require stores/promotion-store
//= require react/form-builder/form-for.react
//= require stores/promotion-store
//= require actions/promotion-actions
var PromotionForm = React.createClass({
  getInitialState: function() {
    return {
      errors: []
    };
  },
  componentDidMount: function() {
    PromotionStore.addFailToTakeAction(function(e, data) {
      if(this.isMounted()) this.setState({errors: data});
    }.bind(this))
    PromotionStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({errors: []});
    }.bind(this))
  },
  render: function() {
    var promotion = this.props.promotion || PromotionStore.new();
    var formOptions = {
      name: "Promotion",
      onSubmit: this.handleSubmit,
      description: {
        type: 'textarea'
      }
    }
    return (
      <div>
        <FormFor object={promotion} options={formOptions} errors={this.state.errors}/>
      </div>
    );
  },
  handleSubmit: function(data) {
    if(this.props.editing) {
      PromotionActions.updatePromotion(data)
    } else {
      PromotionActions.createPromotion(data)
    }
  }
})

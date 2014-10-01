/**
 * @jsx React.DOM
 */
//= require react
//= require stores/promotion-store
//= require react/form-builder/form-for.react
//= require actions/promotion-actions
var PromotionForm = React.createClass({displayName: 'PromotionForm',
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
      description: {
        type: 'textarea'
      },
      discount_type: { type: 'select', values: this.discountTypes()},
      onSubmit: this.handleSubmit
    }
    return (
      React.DOM.div(null,
        FormFor({object: promotion, options: formOptions, errors: this.state.errors})
      )
    );
  },
  handleSubmit: function(data) {
    if(this.props.editing) {
      PromotionActions.updatePromotion(data)
    } else {
      PromotionActions.createPromotion(data)
    }
  },
  discountTypes: function() {
    return PromotionStore.discountTypes.map(function(discountType) {
      return { value: discountType, show: discountType}
    })
  }
})

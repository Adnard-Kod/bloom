/** @jsx React.DOM */
//= require react
//= require actions/promotion-actions.js
//= require stores/promotion-store
var UserPromotionForm = React.createClass({
  render: function() {
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  },

  renderForm: function() {
    var formOptions = {
      name: "Promotion Code",
      submit: { value: "Apply Promotion Code" },
      promoCode: { type: 'text', placeholder: 'Promotion Code' },
      onSubmit: this.validatePromotionCode
    }
    var object = {promoCode: ''};
    return(<FormFor object={object} options={formOptions} errors={this.props.errors} />);
  },

  validatePromotionCode: function(data) {
    var promoInfo = data.promoCode
    PromotionActions.validatePromotionCode(promoInfo)
  }
});

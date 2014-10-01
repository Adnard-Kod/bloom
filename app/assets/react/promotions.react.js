/** @jsx React.DOM */
//= require react
//= require react/promotion.react
//= require stores/promotion-store
//= require react/promotion-form.react
var Promotions = React.createClass({
  getInitialState: function() {
    return {
      promotions: PromotionStore.promotions()
    };
  },
  componentDidMount: function() {
    PromotionStore.addChangeEvent(function() {
      this.setState({
        promotions: PromotionStore.promotions()
      })
    }.bind(this));
    PromotionStore.all();
  },
  render: function() {
    var admin = this.props.admin;
    var promotions = [];
    this.state.promotions.forEach(function(promo) {
      promotions.push(<Promotion key={promo.id} promo={promo} admin={admin}/>)
    })
    return (
      <div className="promotions">
        {this.renderPromotionForm()}
        <h4>Current Promotional Codes</h4>
        <ul className="list-group">
          {promotions}
        </ul>
      </div>
    );
  },
  renderPromotionForm: function() {
    if(this.props.admin) return(<PromotionForm />);
  }
})

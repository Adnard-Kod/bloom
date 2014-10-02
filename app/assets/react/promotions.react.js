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
      if(this.isMounted()) this.setState({ promotions: PromotionStore.promotions() })
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader title="Promotions" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="promotions">
            {this.renderPromotionForm()}
            <hr />
            <PageHeader title="Current Promotional Codes" />
            <ul className="list-group">
              {promotions}
            </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
  renderPromotionForm: function() {
    if(this.props.admin) return(<PromotionForm />);
  }
})

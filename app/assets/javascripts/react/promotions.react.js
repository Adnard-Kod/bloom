/** @jsx React.DOM */
//= require react
//= require react/promotion.react
//= require stores/promotion-store
//= require react/promotion-form.react
var Promotions = React.createClass({displayName: 'Promotions',
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
      promotions.push(Promotion({key: promo.id, promo: promo, admin: admin}))
    })
    return (
      React.DOM.div({className: "promotions"},
        this.renderPromotionForm(),
        React.DOM.h4(null, "Current Promotional Codes"),
        React.DOM.ul({className: "list-group"},
          promotions
        )
      )
    );
  },
  renderPromotionForm: function() {
    if(this.props.admin) return(PromotionForm(null));
  }
})

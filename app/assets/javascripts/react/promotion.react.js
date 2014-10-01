/**
 * @jsx React.DOM
 */
 //= require stores/promotion-store
//= require react/promotion-form.react
//= require actions/promotion-actions
//= require react/edit-links.react

 var Promotion = React.createClass({displayName: 'Promotion',
  getInitialState: function() {
    return {
      editing: false
    };
  },
  getDefaultProps: function() {
    return {
      admin: false
    };
  },
  componentDidMount: function() {
    PromotionStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({editing: false});
    }.bind(this))
  },
  render: function() {
    var promo = this.props.promo;
    return (
      React.DOM.li({className: "list-group-item"},
        React.DOM.p(null, promo.code, ": ", promo.description, " (Discount: ", promo.discount_amount, promo.discount_type, ")"),
        this.renderAdminButtons(),
        this.renderEditForm()
      )
    );
  },
  renderAdminButtons: function() {
    if(this.props.admin) {
      var editLinks = [
        {handler: this.edit, name: 'edit', className: 'text-warning'},
        {handler: this.delete, name: 'delete', className: 'text-danger'}
      ];
      return(EditLinks({links: editLinks}));
    }
  },
  renderEditForm: function() {
    if (this.state.editing) return(PromotionForm({promotion: this.props.promo, editing: "true"}));
  },
  edit: function(e) {
    e.preventDefault();
    this.setState({editing: !this.state.editing})
  },
  delete: function(e) {
    e.preventDefault();
    PromotionActions.destroyPromotion(this.props.promo.id);
  }
 })


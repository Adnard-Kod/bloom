/** @jsx React.DOM */
//= require react
//= require stores/subscription-store
//= require react/subscriptions.react
//= require react/address-required.react
//= require actions/payment-actions

var UserMembershipForm = React.createClass({
  render: function() {
    return (
      <div>
        {this.renderFormOrException()}
      </div>
    );
  },
  renderFormOrException: function() {
    if(!this.props.hasAddr) return(<AddressRequired />);
    var formOptions = {
      name: "Subscription Options",
      submit: { value: "Purchase Subscription" },
      subscription: { type: 'select', values: this.allSubscriptions() },
      onSubmit: this.purchase
    }
    var object = {subscription: this.allSubscriptions()[0]};
    return(<FormFor object={object} options={formOptions} errors={this.props.errors} />);
  },
  allSubscriptions: function () {
    return this.props.subscriptions.map(function (sub) {
      return { value: sub.id, show: sub.name + ' - $' + sub.price };
    });
  },

  purchase: function(data) {
    var subs = this.props.subscriptions;
    // don't modify the subscription, make a copy first.
    var subInfo = $.extend({}, this.props.subscriptions.filter(function(sub){return sub.id === parseInt(data.subscription)})[0])
    subInfo.type = 'Membership';
    PaymentActions.createPaymentForm(subInfo);
  }
});

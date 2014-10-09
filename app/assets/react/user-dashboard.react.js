/** @jsx React.DOM */
//= require react
//= require react/current-menu.react
//= require react/active-add-ons.react
//= require react/page-header.react

var UserDashboard = React.createClass({
  getInitialState: function() {
    return {
      addOns: AddOnStore.addOns()
    };
  },
  componentDidMount: function() {
    AddOnStore.addChangeEvent(function(){
      if(this.isMounted()) this.setState({ addOns: AddOnStore.addOns()})
    }.bind(this))
    AddOnStore.active()
  },
  render: function () {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.renderMembershipAlert()}
          <div className="col-lg-12">
            <CurrentMenu />
            {this.renderAddOns()}
          </div>
        </div>
      </div>
    )
  },
  renderAddOns: function() {
    if(this.userHasActiveMembership()) {
      var object = {};
      var formOptions = {
        onSubmit: this.purchase,
        submit: {value: "Purchase"}
      };
      this.state.addOns.forEach(function(addOn) {
        object[addOn.name] = addOn.id;
        var palceholder = addOn.name + " $" + addOn.price + ": " + addOn.description;
        formOptions[addOn.name] = {type: 'boolean', placeholder: palceholder}
      });
      return(<FormFor object={object} options={formOptions} errors={[]} />)
    }
  },
  renderMembershipAlert: function() {
    if(!this.userHasActiveMembership())
      return(<Alert danger={true} message="You don't have an active membership. Please visit 'My Account' to purchase a new membership or reactive your existing membership." />);

  },
  userHasActiveMembership: function() {
    return SessionStore.currentUser.active_memberships.length > 0;
  },
  purchase: function(data) {
    var selectedAddons = [];
    Object.keys(data).forEach(function(addOn) {
      if(data[addOn]) {
        var id = parseInt(data[addOn]);
        selectedAddons.push(this.state.addOns.filter(function(addOn) { return addOn.id === id })[0]);
      }
    }.bind(this));
    PaymentActions.createAddonPaymentForm(selectedAddons)
  }
});

/** @jsx React.DOM */
//= require react
//= require react/subscription.react
//= require stores/subscription-store
//= require react/subscription-form.react
//= require react/page-header.react
var Subscriptions = React.createClass({
  getInitialState: function() {
    return {
      subscriptions: SubscriptionStore.subscriptions()
    };
  },
  componentDidMount: function() {
    SubscriptionStore.addChangeEvent(function() {
      if(this.isMounted()) {
        this.setState({
          subscriptions: SubscriptionStore.subscriptions()
        })
      }
    }.bind(this));
    SubscriptionStore.all();
  },
  render: function() {
    var admin = this.props.admin;
    var subscriptions = [];
    this.state.subscriptions.forEach(function(sub) {
      subscriptions.push(<Subscription key={sub.id} sub={sub} admin={admin}/>)
    })
    return (
      <div>
        {this.renderSubscriptionForm()}
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <PageHeader title="Subscription Packages" />
              <ul className="list-group">
                {subscriptions}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
  renderSubscriptionForm: function() {
    if(this.props.admin) return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader title="Subscriptions" />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="subscriptions">
              <SubscriptionForm />
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
})

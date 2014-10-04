/** @jsx React.DOM */
//= require react
//= require react/subscription.react
//= require stores/subscription-store
//= require react/subscription-form.react
//= require react/page-header.react
var Subscriptions = React.createClass({displayName: 'Subscriptions',
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
      subscriptions.push(Subscription({key: sub.id, sub: sub, admin: admin}))
    })
    return (
      React.DOM.div(null,
        this.renderSubscriptionForm(),
        React.DOM.div({className: "container-fluid"},
          React.DOM.div({className: "row"},
            React.DOM.div({className: "col-lg-12"},
              PageHeader({title: "Current Subscriptions and Packages"}),
              React.DOM.ul({className: "list-group"},
                subscriptions
              )
            )
          )
        )
      )
    );
  },
  renderSubscriptionForm: function() {
    if(this.props.admin) return(
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            PageHeader({title: "Subscriptions"})
          )
        ),
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-12"},
            React.DOM.div({className: "subscriptions"},
              SubscriptionForm(null),
              React.DOM.hr(null)
            )
          )
        )
      )
    );
  }
})

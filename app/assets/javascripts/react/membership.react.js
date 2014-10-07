/**
 * @jsx React.DOM
 */
//= require react
//= require react/page-header.react
//= require stores/membership-store
//= require react/membership-hold-form.react
//= require actions/membership-actions

var Membership = React.createClass({displayName: 'Membership',
  getInitialState: function() {
    return {
      holdInfo: MembershipStore.membershipHoldDateInfo(),
      holdFormVisible: false
    };
  },

  componentDidMount: function() {
    MembershipStore.addChangeEvent(function() {
      if(this.isMounted()) {
        this.setState({
          holdInfo: MembershipStore.membershipHoldDateInfo()
        });
      }
    }.bind(this));
  },

  getDefaultProps: function() {
    return {
      admin: false
    };
  },

  render: function() {
    var mem = this.props.membership;
    return (
      React.DOM.div(null,
        this.renderActiveMembershipHeader(),
        this.renderOnHoldMembershipHeader(),
        React.DOM.ul({className: "list-group"},
          this.renderUserId(),
          React.DOM.li({className: "list-group-item"},
            React.DOM.p(null, "Weeks Remaining: ", mem.weeks_remaining),
            React.DOM.p(null, "Meals Remaining: ", mem.meals_remaining),
            React.DOM.p(null, "Meals per Week: ", mem.meals_per_week),
            React.DOM.p(null, "Start Date: ", mem.start_date),
            React.DOM.p(null, "End Date: ", mem.end_date),
            React.DOM.p(null, "Status: ", mem.status)
          )
        ),
        this.renderOnHoldButton(),
        this.renderOnHoldDateOptions(),
        this.renderRemoveMembershipHold()
      )
    );
  },

  membershipActive: function() {
    return this.props.membership.status && this.props.membership.status === 'active';
  },

  membershipOnHold: function() {
    return this.props.membership.status && this.props.membership.status === 'on_hold';
  },

  renderActiveMembershipHeader: function() {
    if(this.membershipActive() && !this.props.admin) {
      return (PageHeader({title: "Active Membership Details"}));
    }
  },

  renderOnHoldMembershipHeader: function() {
    if(this.membershipOnHold() && !this.props.admin) {
      return (React.DOM.h4(null, "On Hold Membership Details"));
    }
  },

  renderOnHoldButton: function() {
    if(this.membershipActive() && !this.state.holdFormVisible && this.props.showHoldButton)
      return (React.DOM.a({className: "btn btn-default", onClick: this.getOnHoldDateOptions}, "Put Membership On Hold"));
  },

  getOnHoldDateOptions: function() {
    MembershipStore.getHoldStartDateOptions(this.props.membership.id);
  },

  renderOnHoldDateOptions: function() {
    if(this.membershipActive() && this.state.holdFormVisible === false && this.hasDateOptions()) {
      this.state.holdFormVisible = true;
      return (MembershipHoldForm({holdInfo: this.state.holdInfo, holdMembership: this.putMembershipOnHold}))
    }
  },

  hasDateOptions: function() {
    return this.state.holdInfo.date_options && this.state.holdInfo.date_options.length > 0;
  },

  renderRemoveMembershipHold: function() {
    if(this.membershipOnHold()) {
      return (React.DOM.a({className: "btn btn-default", onClick: this.removeHold}, "Remove Membership Hold"));
    }
  },

  renderUserId: function() {
    if(this.props.admin) return (React.DOM.li({className: "list-group-item"}, "User Id: ", this.props.membership.id));
  },

  putMembershipOnHold: function(holdData) {
    this.setState({ holdFormVisible: false });
    var membershipInfo = {  status: 'active',
                            membershipId: this.props.membership.id,
                            holdStart: holdData.holdDates,
                            numOfWeeksToHold: holdData.maxWeeks };
    MembershipActions.changeMembership(membershipInfo);
  },
});

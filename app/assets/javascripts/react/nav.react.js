/**
  * @jsx React.DOM
*/
//= require react
//= require react/login-signup.react
var Nav = React.createClass({displayName: 'Nav',
  getInitialState: function() {
    return {
      showSignupLogin: false
    };
  },
  render: function() {
    var signupLoginForm = this.state.showSignupLogin ? LoginSignup(null ) : undefined
    return (
      React.DOM.div( {className:"container"}, 
        React.DOM.div( {className:"navbar-header"}, 
          React.DOM.button( {type:"button", className:"navbar-toggle", 'data-toggle':"collapse", 'data-target':"#bs-example-navbar-collapse-1"}, 
            React.DOM.span( {className:"sr-only"}, "Toggle navigation"),
            React.DOM.span( {className:"icon-bar"}),
            React.DOM.span( {className:"icon-bar"}),
            React.DOM.span( {className:"icon-bar"})
          ),
          React.DOM.a( {className:"navbar-brand", href:"#page-top"}, 
            React.DOM.h3(null, "Blooming Spoon")
          )
        ),
        React.DOM.div( {className:"collapse navbar-collapse", id:"bs-example-navbar-collapse-1"}, 
          React.DOM.ul( {className:"nav navbar-nav navbar-right"}, 
            React.DOM.li( {className:"hidden"}, 
              React.DOM.a( {href:"#page-top"})
            ),
            React.DOM.li(null, 
              React.DOM.a( {href:"#values"}, "Values")
            ),
            React.DOM.li(null, 
              React.DOM.a( {href:"#people"}, "People")
            ),
            React.DOM.li(null, 
              React.DOM.a( {href:"#press"}, "Press")
            ),
            React.DOM.li(null, 
              React.DOM.a( {href:"#hours"}, "Hours")
            ),
            React.DOM.li(null, 
              React.DOM.a( {href:"#menu"}, "Menu")
            ),
            React.DOM.li(null, 
              React.DOM.a( {href:"#", onClick:this.showLoginSignup}, "Login / Signup")
            )

          ),
          signupLoginForm
        )
      )
    );
  },

  showLoginSignup: function(e) {
    e.preventDefault();
    var toggle = this.state.showSignupLogin ? false : true;
    this.setState({showSignupLogin: toggle});
  }
});


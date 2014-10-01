/** @jsx React.DOM */
//= require react
//= require stores/user-store
//= require react/admin-user.react

var AdminUsers = React.createClass({
  getInitialState: function() {
    return {
      users: UserStore.users()
    };
  },
  componentDidMount: function() {
    UserStore.addChangeEvent(function() {
        this.setState({
          users: UserStore.users()
        });
    }.bind(this))
    UserStore.all()
  },
  render:function(){
    var users = []
    this.state.users.forEach(function(user){
      users.push(<AdminUser key={user.id} user={user} />)
    })
    return (
      <div className="add-ons">
        {users}
      </div>
    )
  }
})

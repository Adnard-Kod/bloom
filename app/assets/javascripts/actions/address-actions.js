//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants
//= require stores/session-store

var AddressActions = {
  _addUserId: function (data) {
    data.userId = SessionStore.currentUser.id;
    return data;
  },

  createAddress: function (data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_ADDRESS,
      data: this._addUserId(data)
    });
  },

  updateAddress: function (data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.UPDATE_ADDRESS,
      data: this._addUserId(data)
    });
  },

  destroyAddress: function (id) {
    var data = {id: id};
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.DESTROY_ADDRESS,
      data: this._addUserId(data)
    });
  }
}

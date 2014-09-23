//= require dispatchers/blooming-dispatcher
//= require constants/blooming-constants

var AddressActions = {
  createAddress: function (data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.CREATE_ADDRESS,
      data: data
    });
  },
  updateAddress: function (data) {
    BloomingDispatcher.handleViewAction({
      type: BloomingConstants.ActionTypes.UPDATE_ADDRESS,
      data: data
    });
  }
}

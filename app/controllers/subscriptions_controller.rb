class SubscriptionsController < ApplicationController
  def index
    render :json => Subscription.all
  end
end

class User::SubscriptionsController < UserController
  def index
    render json: Subscription.all
  end
end


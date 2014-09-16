class Admin::SubscriptionsController < AdminController
  def create
    subscription = Subscription.new subscription_params
    if subscription.save
      render :json => subscription
    else
      render :json => {}
    end
  end

  private
  def subscription_params
    params.require(:subscription).permit(:description, :price, :weeks, :meals)
  end
end

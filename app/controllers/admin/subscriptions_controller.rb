class Admin::SubscriptionsController < AdminController
  def create
    subscription = Subscription.new subscription_params
    if subscription.save
      render :json => subscription
    else
      render :json => {:errors => subscription.errors.full_messages}, :status => :unprocessable_entity
    end
  end

  def update
    subscription = Subscription.find params[:id]
    if subscription.update_attributes subscription_params
      render :json => subscription
    else
      render :json => {:errors => subscription.errors.full_messages}, :status => :unprocessable_entity
    end
  end

  private
  def subscription_params
    params.require(:subscription).permit(:description, :price, :weeks, :meals)
  end
end

class Admin::SubscriptionsController < AdminController

  before_action :convert_dollars_to_pennies, only: [:create, :update]

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
    if subscription.update subscription_params
      render :json => subscription
    else
      render :json => {:errors => subscription.errors.full_messages}, :status => :unprocessable_entity
    end
  end

  def destroy
    subscription = Subscription.find params[:id]
    if subscription.present?
      subscription.destroy
      render :json => {:id => subscription.id}
    else
      render :json => {:error => "No Subscription found with this id"}
    end
  end

  private
  def subscription_params
    params.require(:subscription).permit(:description, :price, :weeks, :meals, :name)
  end

  def convert_dollars_to_pennies
    params[:subscription][:price] = params[:subscription][:price].to_f * 100
  end
end

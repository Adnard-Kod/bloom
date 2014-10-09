class SubscriptionsController < ApplicationController
  def index
    subs = current_user.try(:new_member?) ? Subscription.all_with_container_fee : Subscription.all
    render :json => subs
  end
end

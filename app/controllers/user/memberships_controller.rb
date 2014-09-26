class User::MembershipsController < UserController
  def create
    stripe_api = StripeApi.new params, current_user
    charge = stripe_api.charge!

    if charge[:paid]
      subscription = Subscription.find(params[:payment_info][:subId])
      membership = current_user.memberships.new :subscription => subscription
      if membership.save
        render json: membership
      else
        render json: { error: membership.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: {error: 'Payment not valid. Please try again.'}
    end
  end
end

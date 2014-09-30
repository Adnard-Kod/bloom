class User::AddOnsController < UserController

  def create
    stripe_api = StripeApi.new params, current_user
    charge = stripe_api.charge!

    if charge[:paid]
      add_on = AddOn.find(params[:payment_info][:subId])
      # add_on = current_user.add_ons.new :add_on => add_on
      if add_on.save
        render json: add_on
      else
        render json: { error: add_on.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: {error: 'Payment not valid. Please try again.'}
    end
  end

  def active
    render json: AddOn.where(active: true)
  end

end

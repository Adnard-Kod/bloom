class User::AddOnsController < UserController

  def create
    stripe_api = StripeApi.new params, current_user
    charge = stripe_api.charge!

    if charge[:paid]
      add_on = AddOn.find(params[:payment_info][:subId])
      if current_user.add_ons << add_on
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

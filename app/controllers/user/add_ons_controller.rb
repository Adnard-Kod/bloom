class User::AddOnsController < UserController

  def create
    stripe_api = StripeApi.new params, current_user
    charge = stripe_api.charge!

    if charge[:paid]
      add_ons = AddOn.where :id => params[:payment_info][:ids]
      if current_user.add_ons << add_ons
        render json: add_ons
      else
        render json: { error: add_on.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: {error: 'Payment not valid. Please try again.'}
    end
  end

  def active
    render json: AddOn.active_add_on
  end

end

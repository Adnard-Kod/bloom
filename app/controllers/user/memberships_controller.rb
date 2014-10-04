class User::MembershipsController < UserController
  def index
    render json: current_user.expired_memberships
  end

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

  def update
    membership = Membership.find(params[:id])
    if params[:status] == 'active'
      membership.put_membership_on_hold
      if membership.save
        render json: membership
      end
    elsif params[:status] == 'on-hold'

    end
  end

  def hold_start_date_options

  end
end

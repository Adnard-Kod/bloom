class User::MembershipsController < UserController
  before_filter :load_and_authorize_user, only: [:index]

  def index
    render json: @user.expired_memberships
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

  private
  def load_and_authorize_user
    @user = User.find(params[:user_id])
    redirect_to root_path unless @user == current_user || current_user.admin?
  end
end

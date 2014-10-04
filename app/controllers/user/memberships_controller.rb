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
    render json: { date_options: calculate_hold_start_date_options(params[:id]), max_hold_weeks: Membership::HOLD_INFO[:hold_max_weeks] }
  end

  private
  def calculate_hold_start_date_options(membership_id)
    today = DateTime.now.to_date
    membership = Membership.find(membership_id)
    possible_start_dates = []
    unless possible_to_hold_membership?(today, membership)
      start_date =  if today.cwday <= Membership::HOLD_INFO[:hold_deadline]
                      today + 7 - today.cwday
                    else
                      today + 14 - today.cwday
                    end
      membership.weeks_remaining.times do |index|
        possible_start_dates << start_date + 7 * index
      end
    end
    possible_start_dates
  end

  def possible_to_hold_membership?(today, membership)
    membership.weeks_remaining > 0 && today <= Membership::HOLD_INFO[:hold_deadline]
  end
end

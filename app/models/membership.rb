class Membership < ActiveRecord::Base
  belongs_to :user
  belongs_to :subscription
  before_create :set_meals_and_weeks, :set_start_and_end_dates
  STATUSES = {
    :active => 'active',
    :expired => 'expired',
    :on_hold => 'on_hold'
  }.freeze

  # hold deadline is in day of the week format, 4 being Thursday
  HOLD_INFO = {
    :hold_max_weeks => 4,
    :hold_deadline => 4
  }.freeze

  # dynamically create:
  #  {status}? and {status}! methods for all statuses
  #  Statuses scopes
  STATUSES.keys.each do |status|
    define_method "#{status}?" do
      self.status == STATUSES[status]
    end
    define_method "#{status}!" do
      self.update_attribute :status, STATUSES[status]
    end
    scope status, ->{where(:status => STATUSES[status])}
  end

  def put_membership_on_hold
    set_hold_start_and_end_dates
  end

  private
  def set_meals_and_weeks
    self.meals_remaining = self.subscription.meals
    self.weeks_remaining = self.subscription.weeks
    self.meals_per_week =  self.meals_remaining / self.weeks_remaining
  end

  def set_start_and_end_dates
    today = DateTime.now.to_date
    self.start_date = if today.cwday == 7
                        today + 7
                      else
                        days_from_sunday = 7 - today.cwday
                        today + days_from_sunday
                      end
    self.end_date = self.start_date + self.weeks_remaining * 7
  end

  def set_hold_start_and_end_dates
    unless self.on_hold?
      self.hold_weeks_remaining = HOLD_INFO[:hold_max_weeks]
      today = DateTime.now.to_date
      self.hold_start = if today.cwday <= HOLD_INFO[:hold_deadline]
                          today + 7 - today.cwday
                        else
                          today + 14 - today.cwday
                        end
      self.hold_end = self.hold_start + self.hold_weeks_remaining * 7
    end
  end
end

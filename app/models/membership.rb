class Membership < ActiveRecord::Base
  belongs_to :user
  belongs_to :subscription
  before_create :set_meals_and_weeks, :set_start_date

  private
  def set_meals_and_weeks
    self.meals_remaining = self.subscription.meals
    self.weeks_remaining = self.subscription.weeks
    self.meals_per_week =  self.meals_remaining / self.weeks_remaining
  end

  def set_start_date
    today = DateTime.now.to_date
    self.start_date = if today.cwday == 7
                        today + 7
                      else
                        days_from_sunday = 7 - today.cwday
                        today + days_from_sunday
                      end
  end
end

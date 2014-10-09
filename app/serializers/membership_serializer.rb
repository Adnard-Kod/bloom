class MembershipSerializer < ActiveModel::Serializer
  attributes :id, :weeks_remaining, :meals_remaining, :meals_per_week, :start_date, :end_date, :status, :hold_start, :hold_end, :hold_weeks_remaining
  has_one :subscription
  def attributes
    data = super
    data[:user] = "#{self.object.user.full_name} (#{self.object.user.email})"
    data
  end
end

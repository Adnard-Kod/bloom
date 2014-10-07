class MembershipSerializer < ActiveModel::Serializer
  attributes :id, :weeks_remaining, :meals_remaining, :meals_per_week, :start_date, :end_date, :status, :hold_start, :hold_end, :hold_weeks_remaining
  has_one :subscription
end

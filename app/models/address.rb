class Address < ActiveRecord::Base
  validates :street_address, :city, :state, :zipcode, :user_id, presence: true
  belongs_to :user
  default_scope ->{order('created_at DESC')}

  def owner?(user)
    self.user == user
  end

  def full
    "#{self.street_address}, #{self.city}, #{self.state} #{self.zipcode}"
  end
end

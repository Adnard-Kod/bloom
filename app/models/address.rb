class Address < ActiveRecord::Base
  validates :street_address, :city, :state, :zipcode, :user_id, presence: true
  belongs_to :user
end

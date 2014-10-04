class Subscription < ActiveRecord::Base
  validates :price, :meals, :weeks, :presence => true
  validates :price, :meals, :weeks, :numericality => true
  has_many :memberships
  has_many :users, :through => :memberships
end

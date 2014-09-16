class Subscription < ActiveRecord::Base
  validates :name, :price, :meals, :weeks, :presence => true
  validates :price, :meals, :weeks, :numericality => true
end

class Subscription < ActiveRecord::Base
  validates :price, :meals, :weeks, :presence => true
  validates :price, :meals, :weeks, :numericality => true
  before_validation :create_name
  has_many :memberships
  has_many :users, :through => :memberships
  private
  def create_name
    self.name = "#{self.meals} meals for #{self.weeks} weeks"
  end
end

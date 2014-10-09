class Subscription < ActiveRecord::Base
  CONTAINER_FEE = 30*100; # $30 one time fee
  validates :price, :meals, :weeks, :name, :presence => true
  validates :price, :meals, :weeks, :numericality => true
  default_scope ->{order('price ASC')}
  has_many :memberships, :dependent => :destroy
  has_many :users, :through => :memberships

  def self.all_with_container_fee
    self.all.map do |sub|
      sub.price = sub.price + CONTAINER_FEE;
      sub
    end
  end
end

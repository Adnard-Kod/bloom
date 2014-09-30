class Promotion < ActiveRecord::Base
  validates :code, :description, :discount_type, :discount_amount, :presence => true
  validates :discount_amount, :numericality => true


end
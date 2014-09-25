class MenuItem < ActiveRecord::Base
  CATEGORIES = ["Entre", "Sidedish"]
  validates :name, :description, :category, presence: true
  has_many :selected_items
  has_many :menus, :through => :selected_items
end

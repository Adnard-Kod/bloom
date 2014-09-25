class MenuItem < ActiveRecord::Base
  validates :name, :description, :category, presence: true
  has_many :selected_items
  has_many :menus, :through => :selected_items
end

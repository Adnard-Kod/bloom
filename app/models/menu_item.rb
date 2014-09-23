class MenuItem < ActiveRecord::Base
  validates :name, :description, :category, presence: true
  has_many :menus
end

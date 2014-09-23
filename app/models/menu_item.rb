class MenuItem < ActiveRecord::Base
  validates :name, presence: true
  has_many :menus
end

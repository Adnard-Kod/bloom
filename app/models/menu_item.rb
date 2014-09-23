class Menu_Item < ActiveRecord::Base
  validates :name, presence: true
  has_many :menus
end

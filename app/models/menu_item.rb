class Menu_Item < ActiveRecord::Base
  validates :name, :description, :type, presence: true
  has_many :menus
end

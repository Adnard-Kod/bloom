class Menu < ActiveRecord::Base
  validates :title, presence: true
  has_many :menu_items
end

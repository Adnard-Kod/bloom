class Menu < ActiveRecord::Base
  validates :title, presence: true
  has_many :selected_items
  has_many :items, :through => :selected_items, :source => :menu_item
  has_many :default_selected_items, ->{where(:default => true)}, :class_name => 'SelectedItem'
  has_many :default_items, :through => :default_selected_items, :source => :menu_item
end

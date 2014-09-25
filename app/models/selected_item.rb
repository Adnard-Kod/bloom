class SelectedItem < ActiveRecord::Base
  belongs_to :menu
  belongs_to :menu_item
  scope :default, ->{ where(:default => true) }
end

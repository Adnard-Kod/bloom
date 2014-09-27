class SelectedItem < ActiveRecord::Base
  belongs_to :menu
  belongs_to :menu_item
  validates_uniqueness_of :menu_item_id, :scope => :menu_id, :message => "is already on the menu"
  scope :default, ->{ where(:default => true) }

end

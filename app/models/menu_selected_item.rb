class MenuSelectedItem < SelectedItem
  validates_uniqueness_of :menu_item_id, :scope => :menu_id, :message => "is already on the menu"
  scope :default, ->{ where(:default => true) }
end

class MenuSelectedItem < SelectedItem
  DEFAULT_COUNT = 6 # admin will always choose 6 default items every week.
  validates_uniqueness_of :menu_item_id, :scope => :menu_id, :message => "is already on the menu"
  scope :default, ->{ where(:default => true) }
end

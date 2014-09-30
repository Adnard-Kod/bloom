class UserSelectedItem < SelectedItem
  attr_accessor :quantity
  validates_uniqueness_of :menu_item_id, :scope => :user_id, :message => "is already on your menu"
end

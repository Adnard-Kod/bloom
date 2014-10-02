class UserSelectedItem < SelectedItem
  attr_accessor :quantity
  scope :default, ->{where(:default => true)}
  belongs_to :user

  def self.group_by_menu_item
    sum = []
    self.all.group_by(&:menu_item_id).each_value {|v| v.first.quantity = v.length; sum.push(v.first)}
    sum.map {|selected| {:item => selected.menu_item.name, :quantity => selected.quantity}}
  end
end

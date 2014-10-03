class UserSelectedItem < SelectedItem
  attr_accessor :quantity
  scope :default, ->{where(:default => true)}
  belongs_to :user
  belongs_to :menu_item

  def self.group_by_menu_item
    sum = []
    self.default.group_by(&:menu_item_id).each_value {|v| v.first.quantity = v.length; sum.push(v.first)}
    sum
  end

  def self.total_orders
    self.group_by_menu_item.map &:reduce_to_item_and_quantity
  end

  def reduce_to_item_and_quantity
    {:item => self.menu_item.name, :quantity => self.quantity}
  end

  def self.reduce_to_user_and_menu_items
    self.includes(:menu_item, :user => [:addresses]).group_by_menu_item.group_by(&:user).reduce([]) do |sum, (user, items)|
      reduced_user = user.reduce_to_name_and_address
      sum.push({:name => reduced_user[:name], :address => reduced_user[:address], :menu_items => items.map(&:reduce_to_item_and_quantity)})
    end
  end

end

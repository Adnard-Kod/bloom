class UserSelectedItem < SelectedItem
  attr_accessor :quantity
  scope :default, ->{where(:default => true)}
  belongs_to :user
  belongs_to :menu_item
  delegate :entree?, :side?, :to => :menu_item

  def self.group_by_menu_item
    self.reduce_to_menu_item self.default
  end

  def undefault!
    self.update_attribute :default, false
  end

  def self.total_orders
    self.group_by_menu_item.map &:reduce_to_item_and_quantity
  end

  def reduce_to_item_and_quantity
    {:item => self.menu_item.name, :quantity => self.quantity, :category => self.menu_item.category}
  end

  def self.reduce_to_menu_item items
    sum = []
    items.group_by(&:menu_item_id).each_value {|v| v.first.quantity = v.length; sum.push(v.first)}
    sum
  end

  def self.reduce_to_user_and_menu_items
    self.includes(:menu_item, :user => [:addresses]).group_by(&:user).reduce([]) do |sum, (user, items)|
      reduced_user = user.reduce_to_name_and_address
      grouped = self.reduce_to_menu_item items
      sum.push({:name => reduced_user[:name], :address => reduced_user[:address], :phone_number => reduced_user[:phone_number], :menu_items => grouped.map(&:reduce_to_item_and_quantity)})
    end
  end

end

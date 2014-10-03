class UserSelectedItem < SelectedItem
  attr_accessor :quantity
  scope :default, ->{where(:default => true)}
  belongs_to :user
end

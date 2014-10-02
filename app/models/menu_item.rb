class MenuItem < Item
  CATEGORIES = ["Entre", "Sidedish"]
  validates :name, :description, :category, presence: true
  has_many :selected_items, :dependent => :destroy
  has_many :menus, :through => :selected_items
end

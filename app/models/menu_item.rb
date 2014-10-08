class MenuItem < Item
  CATEGORIES = ["Entree", "Side Dish"]
  validates :name, :description, :category, presence: true
  has_many :selected_items, :dependent => :destroy
  has_many :menus, :through => :selected_items

  def entree?
    self.category == CATEGORIES.first
  end

  def side?
    self.category == CATEGORIES.last
  end
end

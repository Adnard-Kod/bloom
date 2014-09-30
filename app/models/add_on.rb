class AddOn < Item
  validates :name, :description, :price, presence: true
end

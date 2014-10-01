class AddOn < Item
  validates :name, :description, :price, presence: true
  has_many :add_on_users
  has_many :users, through: :add_on_users
end

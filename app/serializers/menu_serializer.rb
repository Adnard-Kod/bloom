class MenuSerializer < ActiveModel::Serializer
  attributes :id, :title, :current
  has_many :selected_items
end

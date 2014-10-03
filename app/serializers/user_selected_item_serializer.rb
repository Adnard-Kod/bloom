class UserSelectedItemSerializer < ActiveModel::Serializer
  attributes :id, :default, :quantity
  has_one :menu_item
  has_one :user
end

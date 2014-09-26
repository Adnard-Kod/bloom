class SelectedItemSerializer < ActiveModel::Serializer
  attributes :id, :default
  has_one :menu_item
end

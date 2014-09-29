class MenuSerializer < ActiveModel::Serializer
  attributes :id, :title, :current
  has_many :selected_items, :class_name => "MenuSelectedItem", :key => :selected_items
end

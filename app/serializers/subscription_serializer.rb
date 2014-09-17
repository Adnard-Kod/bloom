class SubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :weeks, :meals
end

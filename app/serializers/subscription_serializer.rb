class SubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price
end

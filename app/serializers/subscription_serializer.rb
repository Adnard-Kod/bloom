class SubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :weeks, :meals

  def attributes
    data = super
    data[:price] = data[:price] / 100.00
    data
  end
end

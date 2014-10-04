class AddOnSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :active, :type

  def attributes
    data = super
    data[:price] = data[:price] / 100.00
    data
  end
end

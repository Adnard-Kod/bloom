class PromotionSerializer < ActiveModel::Serializer
  attributes :id, :code, :description, :discount_type, :discount_amount
end

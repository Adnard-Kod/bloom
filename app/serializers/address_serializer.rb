class AddressSerializer < ActiveModel::Serializer
  attributes :id, :street_address, :apartment_number, :city, :state, :zipcode, :delivery_instructions
end

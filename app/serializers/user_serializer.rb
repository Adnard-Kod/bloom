class UserSerializer < ActiveModel::Serializer
  attributes :email, :first_name, :last_name, :full_name, :phone_number, :id, :admin
  has_many :addresses
  has_many :active_memberships
  has_many :expired_memberships
  has_many :on_hold_memberships
end

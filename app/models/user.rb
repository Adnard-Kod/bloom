class User < ActiveRecord::Base
  has_secure_password
  validates :email, :first_name, :last_name, :phone_number, :password_digest, presence: true
  validates :email, uniqueness: true
  has_many :addresses
end

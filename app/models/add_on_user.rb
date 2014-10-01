class AddOnUser < ActiveRecord::Base
  belongs_to :user
  belongs_to :add_on
end

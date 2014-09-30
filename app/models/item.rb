class Item < ActiveRecord::Base
  scope :add_ons, -> { where(type: "AddOn") }
end

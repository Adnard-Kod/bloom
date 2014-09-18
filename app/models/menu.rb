class Menu < ActiveRecord::Base
  validates :title, presence: true

end

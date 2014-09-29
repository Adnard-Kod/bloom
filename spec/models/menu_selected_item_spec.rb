require 'rails_helper'
describe MenuSelectedItem do
  context "validations" do
    it { should validate_uniqueness_of(:menu_item_id).with_message('is already on the menu') }
  end
end

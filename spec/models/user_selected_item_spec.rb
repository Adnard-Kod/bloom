require 'rails_helper'
describe UserSelectedItem do
  context "validations" do
    it { should validate_uniqueness_of(:menu_item_id).with_message('is already on your menu') }
  end
end

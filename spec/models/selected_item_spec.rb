require 'rails_helper'
describe SelectedItem do
  let(:menu) { FactoryGirl.build :menu }
  context "validations" do
    it { should belong_to :menu }
    it { should belong_to :menu_item }
    it { should validate_uniqueness_of(:menu_item_id).with_message('is already on the menu') }
  end
end

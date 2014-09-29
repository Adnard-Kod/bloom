require 'rails_helper'
describe SelectedItem do
  let(:menu) { FactoryGirl.build :menu }
  context "validations" do
    it { should belong_to :menu }
    it { should belong_to :menu_item }
  end
end

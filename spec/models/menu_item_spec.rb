require "rails_helper"
describe MenuItem do
  let(:menu_item) { FactoryGirl.build(:menu_item) }
  context "validations" do
    it { should validate_presence_of :name }
    it { should validate_presence_of :description }
    it { should validate_presence_of :category }
  end
end

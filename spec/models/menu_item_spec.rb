require "rails_helper"
describe MenuItem do
  context "validations" do
    it { should validate_presence_of :name }
    it { should validate_presence_of :description }
    it { should validate_presence_of :category }
  end
  context "associations" do
    it { should have_many :selected_items }
    it { should have_many(:menus).through(:selected_items) }
  end
end

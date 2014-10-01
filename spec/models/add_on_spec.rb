require "rails_helper"
describe AddOn do
  context "validations" do
    it { should validate_presence_of :name }
    it { should validate_presence_of :description }
    it { should validate_presence_of :price }
  end
  context "active" do
    let!(:add_on){ FactoryGirl.create :add_on, :active}
    it "should return the active add on" do
      expect( AddOn.find_by_active(true) ).to eq( add_on )
    end
  end
end

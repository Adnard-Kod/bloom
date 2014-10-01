require 'rails_helper'
describe User::AddOnsController do
  let!(:add_on){ FactoryGirl.create :add_on, :active}
  context "#active" do
    it "It show the active add on for the week" do
      get :active
      expect( AddOn.find_by_active(true) ).to eq( add_on )
    end
  end
end

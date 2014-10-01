require 'rails_helper'
describe User::AddOnsController do
  let(:user) { FactoryGirl.create :user }
  before :each do
    stub_current_user controller, user
  end
  let!(:add_on){ FactoryGirl.create :add_on, :active}
  context "#active" do
    it "returns a json of the active add on items" do
      get :active
      expect(JSON.parse(response.body).count).to eq(1)
    end
  end
end

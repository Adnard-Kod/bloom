require 'rails_helper'
describe Admin::DashboardController do
  let(:user) { FactoryGirl.create :user, :admin }
  before(:each) do
    stub_current_user controller, user
  end
  context "#index" do
    it "is successful" do
      get :index
      expect(response).to be_success
    end
  end
end

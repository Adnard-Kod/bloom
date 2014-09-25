require 'rails_helper'
describe User::DashboardController do
  let(:user) { FactoryGirl.create :user }
  before(:each) do
    stub_current_user controller, user
  end

  context "#index" do
    it "is successful" do
      expect(response).to be_success
    end
  end

  context "#my_account" do
    it "is successful" do
      get :my_account
      expect(response).to be_success
    end
  end

end

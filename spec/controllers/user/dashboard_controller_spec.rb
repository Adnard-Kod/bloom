require 'rails_helper'
describe User::DashboardController do
  let(:user) { FactoryGirl.create :user }
  let(:serialized_user) { UserSerializer.new(user) }
  before(:each) do
    stub_current_user controller, user
  end

  context "#index" do
    it "assigns serialized user" do
      get :index
      expect(assigns(:serialized_user)).to eq(serialized_user.as_json["user"])
    end
  end
end

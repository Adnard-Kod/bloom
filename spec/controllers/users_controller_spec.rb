require 'rails_helper'

RSpec.describe UsersController, :type => :controller do
  let(:user) { create(:user) }

  describe "POST #create" do
    it "creates a new user with valid parameters" do
      expect {
        post :create, user: FactoryGirl.attributes_for(:user)
      }.to change{ User.count }.by(1)
    end
  end
end

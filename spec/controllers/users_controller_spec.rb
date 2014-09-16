require 'rails_helper'

RSpec.describe UsersController, :type => :controller do
  let(:user) { create(:user) }

  describe "POST #create" do
    it "creates a new user with valid parameters" do
      expect {
        post :create, user: FactoryGirl.attributes_for(:user)
      }.to change{ User.count }.by(1)
    end

    it "does not create a new user with invalid parameters" do
      expect {
        post :create, user: { email: '' }
      }.to_not change{ User.count }
    end

    it "returns a 422 status when creating a user with invalid parameters" do
      post :create, user: { email: '', first_name: '', last_name: '', phone_number: '', password: '', password_confirmation: ''}
      expect(response).to have_http_status(422)
    end
  end
end

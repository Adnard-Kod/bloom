require 'rails_helper'

RSpec.describe UsersController, :type => :controller do
  let(:user) { create(:user) }
  let(:errors) { ["Password can't be blank", "Email can't be blank", "First name can't be blank", "Last name can't be blank", "Phone number can't be blank", "Password confirmation doesn't match Password"]}

  describe "POST #create" do
    it "creates a new user with valid parameters" do
      expect {
        post :create, user: attributes_for(:user)
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

    it "returns error messages when fields are left blank" do
      post :create, user: { email: '', first_name: '', last_name: '', phone_number: '', password: '', password_confirmation: ''}
      errors.each_with_index do |error, index|
        expect(JSON.parse(response.body)['errors'][index]).to include(error)
      end
    end
  end
end

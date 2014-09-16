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

    context "error messages" do
      before :each do
        post :create, user: { email: '', first_name: '', last_name: '', phone_number: '', password: '', password_confirmation: ''}
      end

      it "returns an error message when creating a user with blank password" do
        expect(JSON.parse(response.body)['errors'][0]).to include("Password can't be blank")
      end

      it "returns an error message when creating a user with blank email" do
        expect(JSON.parse(response.body)['errors'][1]).to include("Email can't be blank")
      end

      it "returns an error message when creating a user with blank first name" do
        expect(JSON.parse(response.body)['errors'][2]).to include("First name can't be blank")
      end

      it "returns an error message when creating a user with blank last name" do
        expect(JSON.parse(response.body)['errors'][3]).to include("Last name can't be blank")
      end

      it "returns an error message when creating a user with blank phone number" do
        expect(JSON.parse(response.body)['errors'][4]).to include("Phone number can't be blank")
      end

      it "returns an error message when creating a user with blank password confirmation" do
        expect(JSON.parse(response.body)['errors'][5]).to include("Password confirmation doesn't match Password")
      end
    end
  end
end

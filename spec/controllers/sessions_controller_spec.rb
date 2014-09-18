require 'rails_helper'

RSpec.describe SessionsController, :type => :controller do
  let(:user) { create(:user) }

  describe "POST #create" do
    context "POST successes"
    before :each do
      post :create, user: { email: user.email , password: user.password }
    end

    it "should create a session for a valid user" do
      expect(session[:user_id]).to eq(user.id)
    end

    it "redirects to user dashboard upon successful login" do
      expect(JSON.parse(response.body)["redirect"]).to eq(user_dashboard_index_path)
    end
  end

  context "Post failures with bad password" do
    before :each do
      post :create, user: { email: user.email, password: "test" }
    end

    it "should return the correct error status" do
      expect(JSON.parse(response.body)['errors']).to eq(['Email and password combination are invalid.'])
    end

    it "should return the correct http status of 422" do
      expect(response).to have_http_status(422)
    end
  end
end

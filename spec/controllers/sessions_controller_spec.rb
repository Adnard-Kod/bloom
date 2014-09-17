require 'rails_helper'

RSpec.describe SessionsController, :type => :controller do
  let(:user) { create(:user) }

  describe "POST #create" do
    it "should create a session for a valid user" do
      post :create, user: { email: user.email , password: user.password }
      expect(session[:user_id]).to eq(user.id)
    end
  end
end

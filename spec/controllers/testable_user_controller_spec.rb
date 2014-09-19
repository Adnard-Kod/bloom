require 'rails_helper'
class TestableUserController < UserController
  def show
    render :text => 'rendered content here', :status => 200
  end
end
Rails.application.routes.eval_block ->{get '/testable' => 'testable_user#show'}
describe TestableUserController do
  before(:each) do
    Rails.application.routes.eval_block ->{get '/testable' => 'testable_user#show'}
  end
  context "filters" do

    it "redirects_to root_path if user is not authenticated" do
      get :show
      expect(response).to be_redirect
      expect(response).to redirect_to(root_path)
    end
    it "no redirects if user and admin" do
      stub_current_user controller, FactoryGirl.create(:user, :admin)
      get :show
      expect(response).to be_success
    end

  end
end

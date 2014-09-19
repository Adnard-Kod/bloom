require 'rails_helper'
class TestableAdminController < AdminController
  def show
    render :text => 'rendered content here', :status => 200
  end
end
Rails.application.routes.eval_block ->{get '/testable' => 'testable_admin#show'}
describe TestableAdminController do

  context "filters" do
    it "redirects_to root path if user is not authenticated" do
      get :show
      expect(response).to be_redirect
      expect(response).to redirect_to(root_path)
    end
    it "redirects_to root path if user is not authorized" do
      stub_current_user controller, FactoryGirl.create(:user)
      get :show
      expect(response).to be_redirect
      expect(response).to redirect_to(root_path)
    end
  end
end

require 'rails_helper'
describe HomeController do
  context "#index" do
    it "is successful" do
      get :index
      expect(response).to be_success
    end
  end
end

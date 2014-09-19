require 'rails_helper'
describe User::DashboardController do
  context "#index" do
    it "is successful" do
      expect(response).to be_success
    end
  end
end

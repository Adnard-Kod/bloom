require 'rails_helper'

RSpec.describe Admin::MembershipsController, :type => :controller do
  let(:user) { FactoryGirl.create(:user, :admin) }

  before(:each) do
    stub_current_user controller, user
  end

  context "#index" do
    let!(:active_membership) { FactoryGirl.create :membership, :active }
    let!(:on_hold_membership) { FactoryGirl.create :membership, :on_hold }
    let!(:expired_membership) { FactoryGirl.create :membership, :expired }

    xit "returns json with the membership grouped by statuses" do
      get :index
      expect(JSON.parse(response.body)).to eq({"active" => [active_membership], "on_hold" => [], "expired" => []})
    end
  end
end

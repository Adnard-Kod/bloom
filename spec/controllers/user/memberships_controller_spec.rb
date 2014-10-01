require 'rails_helper'

RSpec.describe User::MembershipsController, :type => :controller do
  let(:user) { FactoryGirl.create :user }

  before(:each) do
    stub_current_user controller, user
  end

  context "#index" do
    context "expired memberships" do
      let!(:expired_membership) { FactoryGirl.create :membership, :expired, user: user }

      it "returns all expired memberships for current user" do
        get :index, user_id: user
        expect(JSON.parse(response.body)['memberships'].length).to eq(1)
      end
    end
  end
end

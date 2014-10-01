require 'rails_helper'

RSpec.describe User::MembershipsController, :type => :controller do
  let(:user) { FactoryGirl.create :user }
  let(:subscription) { FactoryGirl.create :subscription}
  before(:each) do
    stub_current_user controller, user
  end

  context "#index" do
    before(:each) do
      membership_expired = user.memberships.new :subscription => subscription
      membership_expired.expired!
      membership_expired.save

      membership = user.memberships.new :subscription => subscription
      membership.expired!
      membership.save
    end

    it "returns all expired memberships for current user" do
      get :index, user_id: user
      expect(JSON.parse(response.body).count).to eq(1)
    end
  end
end

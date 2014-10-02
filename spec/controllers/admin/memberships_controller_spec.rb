require 'rails_helper'

RSpec.describe Admin::MembershipsController, :type => :controller do
  let(:user) { FactoryGirl.create(:user, :admin) }

  before(:each) do
    stub_current_user controller, user
  end

  context "#index" do
    context "active, on_hold, and expired memberships in the database" do
      let!(:active_membership) { FactoryGirl.create :membership, :active }
      let!(:on_hold_membership) { FactoryGirl.create :membership, :on_hold }
      let!(:expired_membership) { FactoryGirl.create :membership, :expired }

      it "returns json with the membership grouped by statuses" do
        memberships = ActiveModel::ArraySerializer.new(Membership.all).as_json
        grouped_memberships = memberships.group_by {|mem| mem[:status]}.as_json
        get :index
        expect(JSON.parse(response.body)).to eq(grouped_memberships)
      end
    end

    context "no memberships in the database" do
      it "returns an empty hash" do
        get :index
        expect(JSON.parse(response.body)).to eq({})
      end
    end
  end
end

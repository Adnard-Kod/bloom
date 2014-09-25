require 'rails_helper'

describe User::SubscriptionsController do
  let(:user) { FactoryGirl.create :user }
  before(:each) do
    stub_current_user controller, user
  end

  context "#index" do
    let(:subscriptions_json) { ActiveModel::ArraySerializer.new Subscription.all }

    it "returns all subscription items" do
      get :index
      expect(JSON.parse(response.body)).to eq({"subscriptions" => [] })
    end
  end
end

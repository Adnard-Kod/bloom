require 'rails_helper'
describe SubscriptionsController do
  context "#index" do
    let(:subscriptions_json) { ActiveModel::ArraySerializer.new Subscription.all }
    it "returns a json of all subscriptions" do
      get :index
      expect(JSON.parse(response.body)).to eq({"subscriptions" => [] })
    end
  end
end

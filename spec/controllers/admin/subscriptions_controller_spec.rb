require 'rails_helper'
describe Admin::SubscriptionsController do
  let(:user) { FactoryGirl.create :user, :admin }
  before(:each) do
    stub_current_user controller, user
  end
  context "#create" do
    let(:valid_attributes) { FactoryGirl.attributes_for :subscription }
    it "creates subscription if params are valid" do
      expect {
        post :create, :subscription => valid_attributes
      }.to change { Subscription.count }.by(1)
      expect(JSON.parse(response.body)["subscription"].keys).to eq(%w{ id name description price weeks meals})
    end
    it "creates subscription if params are valid" do
      valid_attributes.delete :price
      expect {
        post :create, :subscription => valid_attributes
      }.to_not change { Subscription.count }
      expect(JSON.parse(response.body)).to eq("errors" => ["Price can't be blank", "Price is not a number"])
    end
  end
  context "#update" do
    let(:subscription) { FactoryGirl.create :subscription }
    it "updates subscription if params are valid" do
      new_price = 300
      expect {
        put :update, :id => subscription.id, :subscription => { :price => new_price }
      }.to change { subscription.reload.price }.from(subscription.price).to(new_price)
      expect(JSON.parse(response.body)["subscription"].keys).to eq(%w{ id name description price weeks meals})
    end
    it "renders the errors" do
      put :update, :id => subscription.id, :subscription => {price: "hello"}
      expect(JSON.parse(response.body)).to eq("errors" => ["Price is not a number"])
    end
  end
  context "#destroy" do
    let!(:subscription) { FactoryGirl.create :subscription }
    it "destroys the subscription if found" do
      expect {
        delete :destroy, :id => subscription.id
      }.to change { Subscription.count }.by(-1)
      expect { Subscription.find(subscription.id)}.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end

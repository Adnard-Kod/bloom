require 'rails_helper'
describe Admin::PromotionsController do
  let(:user) { FactoryGirl.create :user, :admin}
  before(:each) do
    stub_current_user controller, user
  end
  context "#create" do
    let(:valid_attributes) { FactoryGirl.attributes_for :promotion }
    it "creates promotion if params are valid" do
      expect {
        post :create, :promotion => valid_attributes
      }.to change { Promotion.count }.by(1)
      expect(JSON.parse(response.body)["promotion"].keys).to eq(%w{ id code description discount_type discount_amount})
    end
    it "creates does not create promotion if params are invalid" do
      valid_attributes.delete :code
      expect {
        post :create, :promotion => valid_attributes
      }.to_not change { Promotion.count }
      expect(JSON.parse(response.body)).to eq("errors" => ["Code can't be blank"])
    end
  end
  context "#update" do
    let(:promotion) { FactoryGirl.create :promotion }
    it "updates promotion if params are valid" do
      new_code = "NEWPROMOCODE"
      expect {
        put :update, :id => promotion.id, :promotion => { :code => new_code }
      }.to change { promotion.reload.code }.from(promotion.code).to(new_code)
      expect(JSON.parse(response.body)["promotion"].keys).to eq(%w{ id code description discount_type discount_amount})
    end
    it "renders the errors" do
      put :update, :id => promotion.id, :promotion => {discount_amount: "not_a_number"}
      expect(JSON.parse(response.body)).to eq("errors" => ["Discount amount is not a number"])
    end
  end
  context "#destroy" do
    let!(:promotion) { FactoryGirl.create :promotion }
    it "destroys the promotion if found" do
      expect {
        delete :destroy, :id => promotion.id
      }.to change { Promotion.count }.by(-1)
      expect { Promotion.find(promotion.id)}.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
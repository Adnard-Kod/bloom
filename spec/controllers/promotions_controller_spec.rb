require 'rails_helper'
describe PromotionsController do
  context "#index" do
    let(:promotions_json) { ActiveModel::ArraySerializer.new Promotion.all }
    it "returns a json of all promotions" do
      get :index
      expect(JSON.parse(response.body)).to eq({"promotions" => [] })
    end
  end
  context "validate_promotion_code" do
    let(:active_promotion) { FactoryGirl.create(:promotion) }

    it "returns a json of the active promotion if valid promo code is passed in" do
      get :validate_promotion_code, :promo_code => active_promotion.code
      expect(JSON.parse(response.body)["promotion"]).to eq(active_promotion.as_json)
    end
  end
end

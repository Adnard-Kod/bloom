require 'rails_helper'
describe Admin::WeeklyOrdersController do
  let(:admin) { FactoryGirl.create :user, :admin }
  before(:each) do
    stub_current_user controller, admin
  end
  context "#index" do
    let!(:user_selection) { FactoryGirl.create :user_selected_item, :default }
    let(:serilaized_totals) { ActiveModel::ArraySerializer.new(UserSelectedItem.
      total_orders).as_json }
    let(:serilaized_user_summary) {ActiveModel::ArraySerializer.new(UserSelectedItem.
      reduce_to_user_and_menu_items).as_json}
    it "responds with weekly order summaries" do
      get :index
      serilaized_totals.map &:stringify_keys!
      serilaized_user_summary.map &:stringify_keys!
      expect(JSON.parse(response.body)).to eq({"weekly_orders" => serilaized_totals, "weekly_by_user" => serilaized_user_summary})
    end
  end
end

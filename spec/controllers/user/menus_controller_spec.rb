require 'rails_helper'
describe User::MenusController do
  let!(:user) { FactoryGirl.create :user }
  let!(:menu) { FactoryGirl.create :menu, :current }
  let!(:menu_selected_item) { FactoryGirl.create :menu_selected_item, :default, :menu => menu }
  let(:meal_count) { 6 }
  let!(:subscription) { FactoryGirl.create :subscription, :meals => meal_count }
  let!(:membership) { FactoryGirl.create :membership, :active, :subscription => subscription, :user => user  }
  before(:each) do
    stub_current_user controller, user
  end
  xit "#index" do
    serialized_menu = MenuSerializer.new(menu).as_json
    user_selected_items = user.find_or_create_selected_items(menu)
    serialized_selected_items = ActiveModel::ArraySerializer.new(user_selected_items).as_json
    active_subscription = user.active_subscription.first
    expected_response = {:menu => serialized_menu["menu"], :selected_items => serialized_selected_items}
    expected_response[:meals_combo] = MealLimit.new(active_subscription.meals).combos if active_subscription.present?
    get :index
    body = JSON.parse(response.body)
    body.symbolize_keys!
    body[:menu].symbolize_keys!
    body[:selected_items].each &:symbolize_keys!
    body[:selected_items].each {|sel| sel[:menu_item].symbolize_keys!}
    body[:meals_combo].map! &:symbolize_keys!
    expect(body[:selected_items]).to eq(expected_response[:selected_items])
  end
end

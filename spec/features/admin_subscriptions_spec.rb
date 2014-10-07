require 'rails_helper'
describe "Admin Subscriptions", :js => true do
  let!(:user) { FactoryGirl.create :user, :admin }
  let!(:subscription) { FactoryGirl.create :subscription }
  before(:each) do
    stub_current_admin_user user
  end

  context "can CRUD Subscriptions" do
    it "displays Prices correctly in Dollars" do
      visit admin_dashboard_index_path
      click_on "Subscriptions"
      price_in_dollars = subscription.price / 100
      expect(page).to have_content(subscription.name)
      expect(page).to have_content(price_in_dollars)
    end
  end
end
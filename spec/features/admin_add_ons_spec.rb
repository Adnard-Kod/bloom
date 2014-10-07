require 'rails_helper'
describe "Admin Add-ons", :js => true do
  let!(:user) { FactoryGirl.create :user, :admin }
  let!(:add_on) { FactoryGirl.create :add_on }
  before(:each) do
    stub_current_admin_user user
  end

  context "can CRUD Add Ons" do
    it "displays Prices correctly in Dollars" do
      visit admin_dashboard_index_path
      click_on "Add On Items"
      price_in_dollars = add_on.price / 100
      expect(page).to have_content(price_in_dollars)
    end
  end
end
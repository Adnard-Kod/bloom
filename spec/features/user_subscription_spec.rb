require 'rails_helper'
describe "User Subscription", :js => true do
  let!(:user) { FactoryGirl.create :user }
  let!(:subscription) { FactoryGirl.create :subscription }
  before(:each) {
    stub_current_admin_user user
  }
  context "user has no address" do
    it "doesn't have any subscription related content" do
      visit '/user/dashboard#user-profile'
      expect(page).to_not have_content("Active Membership Details")
      expect(page).to_not have_content("Apply Promotion Code")
      expect(page).to_not have_content("Purchase Subscription")
      expect(page).to_not have_content("Subscription Packages")
    end
  end
  context "without subscription" do
    let!(:address) { FactoryGirl.create :address, :user => user }
    it "shows the subscription options and form" do
      visit '/user/dashboard#user-profile'
      expect(page).to_not have_content("Active Membership Details")
      expect(page).to have_content("Subscription Packages")
      expect(page).to have_content subscription.name
      expect { find('input[value="Purchase Subscription"]') }.to_not raise_error
    end
  end
  context "with subscription" do
    let!(:address) { FactoryGirl.create :address, :user => user }
    let!(:membership) { FactoryGirl.create :membership, :user => user }
    let(:membership_subscription) { membership.subscription }
    it "doesnt show subscription options or form" do
      visit '/user/dashboard#user-profile'
      expect(page).to have_content("Active Membership Details")
      expect(page).to_not have_content("Subscription Packages")
      wait_for_ajax_to_finish
      expect(page).to have_content "Meals Remaining: #{membership_subscription.meals}"
      expect(page).to_not have_content subscription.name
      expect { find('input[value="Purchase Subscription"]') }.to raise_error
    end
  end
end

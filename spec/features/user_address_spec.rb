require 'rails_helper'
describe "User Address", :js => true do
  let!(:user) { FactoryGirl.create :user }
  before(:each) {
    stub_current_admin_user user
  }
  context "user has no address and no active memberships" do
    it "will see an alert form" do
      visit '/user/dashboard#user-profile'
      expect(page).to have_content('You must have an address associated with your account to purchase a subscription. Please create one in the form below.')
    end

    it "will not have current address or active membership details or form" do
      visit '/user/dashboard#user-profile'
      expect(page).to_not have_content("Current Address")
      expect(page).to_not have_content("Active Membership Details")
      expect(page).to_not have_content("Apply Promotion Code")
      expect(page).to_not have_content("Purchase Subscription")
      expect(page).to_not have_content("Subscription Packages")
    end

  end
  context "create address" do
    let(:address) { FactoryGirl.build :address }
    it "will see address form" do
      visit '/user/dashboard#user-profile'
      fill_in 'Street_address', :with => address.street_address
      fill_in 'City', :with => address.city
      fill_in 'State', :with => address.state
      fill_in 'Zipcode', :with => address.zipcode
      fill_in 'Delivery_instructions', :with => address.delivery_instructions
      click_on "Create Address"
      wait_for_ajax_to_finish
      expect(page).to have_content "Current Address"
      expect { click_on "Create Address" }.to raise_error
    end
    it "will show errors" do
      visit '/user/dashboard#user-profile'
      fill_in 'City', :with => address.city
      fill_in 'State', :with => address.state
      fill_in 'Zipcode', :with => address.zipcode
      fill_in 'Delivery_instructions', :with => address.delivery_instructions
      click_on "Create Address"
      wait_for_ajax_to_finish
      expect(page).to have_content "Street address can't be blank"
      fill_in 'Street_address', :with => address.street_address
      click_on "Create Address"
      wait_for_ajax_to_finish
      expect(page).to_not have_content "Street address can't be blank"
      expect(page).to have_content "Current Address"
      expect { click_on "Create Address" }.to raise_error
    end
  end
  context "edit address" do
    let!(:address) { FactoryGirl.create :address, :user => user }
    it "edits the address" do
      visit '/user/dashboard#user-profile'
      find('.edit-address').click
      fill_in "State", :with => "Oaktown"
      click_on "Update Address"
      wait_for_ajax_to_finish
      expect(page).to have_content "Oaktown"
      expect { click_on "Update Address" }.to raise_error
    end
    it "displays errors" do
      visit '/user/dashboard#user-profile'
      find('.edit-address').click
      fill_in "State", :with => ""
      click_on "Update Address"
      wait_for_ajax_to_finish
      expect(page).to have_content "State can't be blank"
      fill_in "State", :with => "Oaktown"
      click_on "Update Address"
      wait_for_ajax_to_finish
      expect(page).to have_content "Oaktown"
      expect { click_on "Update Address" }.to raise_error
      expect(page).to_not have_content("State can't be blank")
    end
  end
end

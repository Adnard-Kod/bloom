require 'rails_helper'
describe "Admin Users", :js => true do
  let!(:user) { FactoryGirl.create :user, :admin }
  before(:each) do
    stub_current_admin_user user
  end
    it "can see all users" do
      visit admin_dashboard_index_path
      click_on "User Management"
      expect(page).to have_content(user.email)
    end

  context "landing page for #admin-usrs" do
    it "delete button deletes a user" do
      visit admin_dashboard_index_path
      click_on "User Management"
      click_on "delete"
      expect(page).to_not have_content(user.email)
    end

    it "Admin button makes user an admin" do
      non_admin = FactoryGirl.create :user
      visit admin_dashboard_index_path
      click_on "User Management"
      within(".panel-info") { click_on "Admin" }
      wait_for_ajax_to_finish
      expect(non_admin.reload).to be_admin
    end
  end

end

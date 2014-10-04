require 'rails_helper'
describe "Admin Users", :js => true do
  let!(:user) { FactoryGirl.create :user, :admin }
  before(:each) do
    stub_current_admin_user user
  end
    it "can see all users" do
      visit admin_dashboard_index_path
      click_on "Users"
      expect(page).to have_content(user.email)
    end

  context "landing page for #admin-usrs" do
    it "delete button deletes a user" do
      visit admin_dashboard_index_path
      click_on "Users"
      click_on "delete"
      expect(page).to_not have_content(user.email)
    end
    it "Admin button makes user an admin" do
      non_admin = FactoryGirl.create :user
      visit admin_dashboard_index_path
      click_on "Users"
      within('.panel-info') { click_on "Admin" }
      wait_for_ajax_to_finish
      expect(non_admin.reload).to be_admin
    end
    # it "view profile button show user profile" do
    #   visit admin_dashboard_index_path
    #   click_on "Users"
    #   within(".panel-body") { click_on "view profile" }
    #   # expect(page).to have_content("Create Address")
    #   # find this button
    # end
  end
  context "editing user profile form" do
    #test this forms
  end

end

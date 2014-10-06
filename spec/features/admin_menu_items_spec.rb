require 'rails_helper'
describe "Admin Menu Items", :js => true do
  let!(:user) { FactoryGirl.create :user, :admin }
  let!(:menu_item) { FactoryGirl.create :menu_item }
  before(:each) do
    stub_current_admin_user user
  end

  context "can CRUD menu items" do

    it "can see menu item" do
      visit admin_dashboard_index_path
      click_on "Menu Items"
      expect(page).to have_content(menu_item.name)
    end

    it "can create menu item" do
      visit admin_dashboard_index_path
      click_on "Menu Items"
      fill_in "Name", with: "Menu Item Name"
      fill_in "Description", with: "Menu Item Description"
      click_on "Create Menu Item"
      wait_for_ajax_to_finish
      expect(page).to have_content("Menu Item Name")
      expect(page).to have_content("Menu Item Description")
    end

    it "can update menu item" do
      visit admin_dashboard_index_path
      click_on "Menu Items"
      click_on "edit"
      within('.panel-body') { fill_in "Name", with: "New Menu Item Name" }
      within('.panel-body') { fill_in "Description", with: "New Menu Item Name" }
      click_on "Update Menu Item"
      wait_for_ajax_to_finish
      expect(page).to have_content("New Menu Item Name")
    end

    it "can delete menu item" do
      visit admin_dashboard_index_path
      click_on "Menu Items"
      click_on "delete"
      expect(page).to_not have_content(menu_item.name)
    end

  end
end

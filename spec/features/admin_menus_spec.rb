require 'rails_helper'
describe "Admin Add Ons", :js => true do
  let!(:user) { FactoryGirl.create :user, :admin }
  let!(:menu) { FactoryGirl.create :menu }
  before(:each) do
    stub_current_admin_user user
  end

  context "can CRUD Menus" do
    it "can see Menu" do
      visit admin_dashboard_index_path
      click_on "Menus"
      expect(page).to have_content(menu.title)
    end

  #   it "can create Menu" do
  #     visit admin_dashboard_index_path
  #     click_on "Menu Items"
  #     fill_in "Name", with: "Menu Name"
  #     fill_in "Description", with: "Menu Description"
  #     fill_in "Price", with: "10"
  #     click_on "Create Menu Item"
  #     wait_for_ajax_to_finish
  #     expect(page).to have_content("Menu Name")
  #     expect(page).to have_content("Menu Description")
  #     expect(page).to have_content("$10")
  #   end

  #   it "can update Menu" do
  #     visit admin_dashboard_index_path
  #     click_on "Menu Items"
  #     click_on "edit"
  #     within('.panel-body') { fill_in "Name", with: "New Menu Name" }
  #     within('.panel-body') { fill_in "Description", with: "New Add On Description" }
  #     within('.panel-body') { fill_in "Price", with: "100" }
  #     click_on "Update Add On"
  #     wait_for_ajax_to_finish
  #     expect(page).to have_content("New Add On Name")
  #     expect(page).to have_content("New Add On Description")
  #     expect(page).to have_content("$100")
  #   end

  #   it "can delete Add On" do
  #     visit admin_dashboard_index_path
  #     click_on "Add On Items"
  #     click_on "delete"
  #     expect(page).to_not have_content(menu.name)
  #   end
  # end

  # context "#Active" do
  #   it "can make an add on active" do
  #     non_active_menu = FactoryGirl.create :menu
  #     visit admin_dashboard_index_path
  #     click_on "Add On Items"
  #     within(".panel-title") { click_on "active"}
  #     wait_for_ajax_to_finish
  #     expect(non_active_menu).to be_active
  #   end
  end
end

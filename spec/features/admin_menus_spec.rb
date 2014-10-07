require 'rails_helper'
describe "Admin Menus", :js => true do
  let!(:user) { FactoryGirl.create :user, :admin }
  let!(:menu) { FactoryGirl.create :menu }
  let(:menu_item_entree) { "Chicken" }
  let(:menu_item_side_dish) { "Peas" }
  let!(:menu_entree) { FactoryGirl.create :menu_item, :name => menu_item_entree, :category => "Entree" }
  let!(:menu_side_dish) { FactoryGirl.create :menu_item, :name => menu_item_side_dish, :category => "Side Dish" }
  before(:each) do
    stub_current_admin_user user
  end

  context "can CRUD Menus" do
    it "can see Menu" do
      visit admin_dashboard_index_path
      click_on "Menus"
      expect(page).to have_content(menu.title)
    end

    it "can create Menu" do
      visit admin_dashboard_index_path
      click_on "Menus"
      fill_in "Title", with: "Menu Title"
      click_on "Create Menu"
      wait_for_ajax_to_finish
      expect(page).to have_content("Menu Title")
    end

    it "can update Menu" do
      visit admin_dashboard_index_path
      click_on "Menus"
      click_on "edit"
      within(".panel-heading") { fill_in "Title", with: "New Menu Name" }
      click_on "Update Menu"
      wait_for_ajax_to_finish
      expect(page).to have_content("New Menu Name")
    end

    it "can delete Add On" do
      visit admin_dashboard_index_path
      click_on "Menus"
      click_on "delete"
      expect(page).to_not have_content(menu.title)
    end
  end

  context "Current" do
    let!(:menu2) { FactoryGirl.create :menu }
    it "can make an menu current" do
      visit admin_dashboard_index_path
      click_on "Menus"
      within("#page-wrapper") { click_link("current", :match => :first) }
      wait_for_ajax_to_finish
      expect(menu.reload).to be_current
      expect(menu2).to_not be_current
    end
  end

  context "Adding and deleting menu items on a menu" do
    it "can add a menu item to a menu as a entree" do
      visit admin_dashboard_index_path
      click_on "Menus"
      click_on "Add Menu Item"
      wait_for_ajax_to_finish
      expect(page.find(".entree")).to have_content menu_item_entree
    end

    # it "can add a menu item to a menu as a side dish" do
    #   visit admin_dashboard_index_path
    #   click_on "Menus"
    #   click_on "Add Menu Item"
    #   wait_for_ajax_to_finish
    #   expect(page.find(".side-dish")).to have_content menu_item_side_dish
    # end

    it "can delete a menu item to a menu" do
      visit admin_dashboard_index_path
      click_on "Menus"
      click_on "Add Menu Item"
      wait_for_ajax_to_finish
      within(".entree") { click_link("x", :match => :first) }
      wait_for_ajax_to_finish
      expect(page.has_css?(".entree")).to eq(false)
    end
  end

  context "Errors" do
    it "error is display when the same menu item is added to a menu twice" do
      visit admin_dashboard_index_path
      click_on "Menus"
      click_on "Add Menu Item"
      wait_for_ajax_to_finish
      click_on "Add Menu Item"
      expect(page).to have_content "Menu item is already on the menu"
    end
  end
end

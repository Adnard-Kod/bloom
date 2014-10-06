require 'rails_helper'
describe "Admin Add Ons", :js => true do
  let!(:user) { FactoryGirl.create :user, :admin }
  let!(:add_on) { FactoryGirl.create :add_on }
  before(:each) do
    stub_current_admin_user user
  end

  it "displays Prices correctly in Dollars" do
    visit admin_dashboard_index_path
    click_on "Add On Items"
    price_in_dollars = add_on.price / 100
    expect(page).to have_content(price_in_dollars)
  end

  it "can create Add On" do
    visit admin_dashboard_index_path
    click_on "Add On Items"
    fill_in "Name", with: "Add On Name"
    fill_in "Description", with: "Add On Description"
    fill_in "Price", with: "10"
    click_on "Create Add On Item"
    wait_for_ajax_to_finish
    expect(page).to have_content("Add On Name")
    expect(page).to have_content("Add On Description")
    expect(page).to have_content("$10")
  end

  it "can update Add On" do
    visit admin_dashboard_index_path
    click_on "Add On Items"
    click_on "edit"
    within('.panel-body') { fill_in "Name", with: "New Add On Name" }
    within('.panel-body') { fill_in "Description", with: "New Add On Description" }
    within('.panel-body') { fill_in "Price", with: "100" }
    click_on "Update Add On"
    wait_for_ajax_to_finish
    expect(page).to have_content("New Add On Name")
    expect(page).to have_content("New Add On Description")
    expect(page).to have_content("$100")
  end

  it "can delete Add On" do
    visit admin_dashboard_index_path
    click_on "Add On Items"
    click_on "delete"
    expect(page).to_not have_content(add_on.name)
  end
end

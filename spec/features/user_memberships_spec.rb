require 'rails_helper'

describe "User Memberships", :js => true do
  let!(:user) { FactoryGirl.create :user }
  let!(:subscription) { FactoryGirl.create :subscription }
  let!(:membership) { FactoryGirl.create :membership }
  before(:each) do
    stub_current_user user
  end

  context "can put a membership on hold" do
    xit 'can put a membership on hold' do
      visit user_dashboard_index_path
      click_on "My Account"
      click_on "Put Membership On Hold"
      wait_for_ajax_to_finish
    end
  end
end

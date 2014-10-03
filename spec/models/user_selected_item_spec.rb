require 'rails_helper'
describe UserSelectedItem do
  let!(:user_selected_item) { FactoryGirl.create :user_selected_item, :default }
  context "associations" do
    [:user, :menu_item].each do |assoc|
      it { should belong_to assoc }
    end
  end
  it ".default scope" do
    not_default = FactoryGirl.create :user_selected_item
    expect(UserSelectedItem.default).to eq [user_selected_item]
  end
  it ".group_by_menu_item" do
    FactoryGirl.create :user_selected_item, :default, :menu_item => user_selected_item.menu_item
    FactoryGirl.create :user_selected_item
    expect(UserSelectedItem.group_by_menu_item).to eq [user_selected_item]
    expect(UserSelectedItem.group_by_menu_item.first.quantity).to eq 2
  end
  it ".total_orders" do
    expect_any_instance_of(UserSelectedItem).to receive(:reduce_to_item_and_quantity).once
    UserSelectedItem.total_orders
  end
  it "#reduce_to_item_and_quantity" do
    expect(user_selected_item.reduce_to_item_and_quantity).to eq({:item => user_selected_item.menu_item.name, :quantity => user_selected_item.quantity})
  end
  it ".reduce_to_user_and_menu_items" do
    user = user_selected_item.user
    grouped = UserSelectedItem.group_by_menu_item
    reduced = {:name => user.full_name, :address => user.current_address.try(:full), :menu_items => grouped.map(&:reduce_to_item_and_quantity)}
    expect(UserSelectedItem.reduce_to_user_and_menu_items).to eq([reduced])
  end
end

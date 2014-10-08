require 'rails_helper'
describe UserSelectedItem do
  let!(:user_selected_item) { FactoryGirl.create :user_selected_item, :default }
  let(:user) { user_selected_item.user }
  let(:menu_item) { user_selected_item.menu_item }
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
    expect(user_selected_item.reduce_to_item_and_quantity).to eq({:item => user_selected_item.menu_item.name, :quantity => user_selected_item.quantity, :category => user_selected_item.menu_item.category })
  end
  it ".reduce_to_menu_item" do
    FactoryGirl.create :user_selected_item, :default, :user => user, :menu_item => menu_item
    FactoryGirl.create :user_selected_item, :default, :menu_item => menu_item

    expect(UserSelectedItem.reduce_to_menu_item(user.default_selected_items)).to eq([user_selected_item])
    expect(UserSelectedItem.reduce_to_menu_item(user.default_selected_items).first.quantity).to eq 2
  end
  context ".reduce_to_user_and_menu_items" do
    before(:each) do
      # create another selected item for the original user and origin item (user now selected quantity 2 of menu_item)
      FactoryGirl.create :user_selected_item, :default, :user => user, :menu_item => menu_item
      # create another selected item for the same user with different menu_item choice
      FactoryGirl.create :user_selected_item, :default, :user => user
      FactoryGirl.create :address, :user => user
    end
    let!(:user_2_selected_item) { FactoryGirl.create :user_selected_item, :default, :menu_item => menu_item }
    let(:user_2) { user_2_selected_item.user }
    it ".reduce_to_user_and_menu_items" do
      user_grouped = UserSelectedItem.reduce_to_menu_item user.default_selected_items
      user_2_grouped = UserSelectedItem.reduce_to_menu_item user_2.default_selected_items
      reduced = [
        {:name => user.full_name, :address => user.current_address.try(:reduce_to_full_and_instructions), :menu_items => user_grouped.map(&:reduce_to_item_and_quantity)},
        {:name => user_2.full_name, :address => user_2.current_address.try(:reduce_to_full_and_instructions), :menu_items => user_2_grouped.map(&:reduce_to_item_and_quantity)}
      ]
      expect(UserSelectedItem.reduce_to_user_and_menu_items).to eq(reduced)
    end
  end
end

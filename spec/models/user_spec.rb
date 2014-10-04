require 'rails_helper'
describe User do
  let(:user) { FactoryGirl.create :user }
  subject { user }
  context "validations" do
    [:email, :first_name, :last_name, :phone_number].each do |attr|
      it { should validate_presence_of attr }
    end
    it { should validate_uniqueness_of :email }
    it { should validate_confirmation_of :password }
  end
  context "associations" do
    [:addresses, :memberships, :subscriptions, :active_memberships, :active_subscription, :selected_items, :default_selected_items, :active_memberships, :on_hold_memberships, :expired_memberships, :add_on_users, :add_ons].each do |assoc|
      it { should have_many assoc }
    end
  end
  context "callbacks" do
    it "subscribes user to mailchimp on creation" do
      allow_any_instance_of(User).to receive(:mailchimp)
      expect_any_instance_of(User).to receive(:subscribe_to_mailchimp).once
      user = FactoryGirl.build :user
      user.save
    end
    it "subscribes user to mailchimp on updates if email changed" do
      allow(user).to receive(:mailchimp)
      expect(user).to receive(:subscribe_to_mailchimp).once
      user.update_attributes :email => "new@email.com"
    end
    xit "doesn't subscribes user to mailchimp on updates if email hasn't changed" do
      allow(user).to receive(:mailchimp)
      expect(user).to_not receive(:subscribe_to_mailchimp)
      user.update_attributes :first_name => "new name"
    end
    it "unsubscribes user from mailchimp on destroy" do
      allow(user).to receive(:mailchimp)
      expect(user).to receive(:unsubscribe_to_mailchimp).once
      user.destroy
    end
  end
  it "#full_name" do
    expect(user.full_name).to eq "#{user.first_name} #{user.last_name}"
  end
  it "#reduce_to_name_and_address" do
    expect(user.reduce_to_name_and_address).to eq({:name => user.full_name, :address => user.current_address})
  end
  it ".current_orders" do
    selected_item = FactoryGirl.create :user_selected_item
    expect_any_instance_of(User).to receive(:grouped_selected_items).once
    User.current_orders
  end
  it ".serialized_current_orders" do
    expect(ActiveModel::ArraySerializer).to receive(:new).with(User.current_orders)
    User.serialized_current_orders
  end
  it "#current_address" do
    address = FactoryGirl.create :address, :user => user
    current_address = FactoryGirl.create :address, :user => user
    expect(user.current_address).to eq current_address
  end
  it "reduce_to_name_and_address" do
    address = FactoryGirl.create :address, :user => user
    expect(user.reduce_to_name_and_address). to eq({:name => user.full_name, :address => address.full})
  end
  it "#grouped_selected_items" do
    selected_item = FactoryGirl.create :user_selected_item, :user => user
    FactoryGirl.create :user_selected_item, :user => user, :menu_item => selected_item.menu_item
    expect(user.grouped_selected_items).to eq([selected_item])
    expect(user.grouped_selected_items.first.quantity).to eq 2
  end
end

require 'rails_helper'

describe Admin::SelectedItemsController do
  let(:user) { FactoryGirl.create :user, :admin }
  let!(:menu) { FactoryGirl.create :menu }
  let!(:menu_item) { FactoryGirl.create :menu_item }
  let(:serialized_menu_item) { MenuItemSerializer.new(menu_item).as_json["menu_item"].stringify_keys!}
  before(:each) do
    stub_current_user controller, user
  end
  context "#index" do
    it "returns a json of all menu items" do
      menu.items << menu_item
      get :index, :menu_id => menu.id
      expect(JSON.parse(response.body)).to eq({"selected_items" => [serialized_menu_item]})
    end
  end
  context "#create" do
    it "creates a menu item" do
      post :create, :menu_id => menu.id, :menu_item_id => menu_item.id
      expect(menu.reload.items).to eq [menu_item]
      expect(JSON.parse(response.body)).to eq({"menu_item" =>serialized_menu_item})
    end
  end
  context "#destroy" do
    it "destroys the menu item if found" do
      menu.items << menu_item
      delete :destroy, :menu_id => menu.id, :id => menu_item.id
      expect(menu.reload.items).to be_empty
      expect(JSON.parse(response.body)).to eq({"menu_item" =>serialized_menu_item})
    end
  end
end

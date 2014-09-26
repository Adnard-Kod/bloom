require 'rails_helper'

describe Admin::SelectedItemsController do
  let(:user) { FactoryGirl.create :user, :admin }
  let!(:menu) { FactoryGirl.create :menu }
  let!(:menu_item) { FactoryGirl.create :menu_item }
  before(:each) do
    stub_current_user controller, user
  end
  context "#index" do
    it "returns a json of all menu items" do
      menu.items << menu_item
      serialized_selected_items = ActiveModel::ArraySerializer.new(menu.selected_items).as_json.first
      get :index, :menu_id => menu.id
      parsed_response = JSON.parse(response.body)
      parsed_response["selected_items"][0].symbolize_keys!
      parsed_response["selected_items"][0][:menu_item].symbolize_keys!
      expect(parsed_response).to eq({"selected_items"=> [serialized_selected_items]})
    end
  end
  context "#create" do
    it "creates a menu item" do
      post :create, :menu_id => menu.id, :menu_item_id => menu_item.id
      serialized_selected_items = ActiveModel::ArraySerializer.new(menu.reload.selected_items).as_json.first
      parsed_response = JSON.parse(response.body)
      parsed_response["selected_item"].symbolize_keys!
      parsed_response["selected_item"][:menu_item].symbolize_keys!
      expect(menu.reload.items).to eq [menu_item]
      expect(parsed_response).to eq({"selected_item" =>serialized_selected_items})
    end
  end
  context "#update" do
    it "updates a selected menu item" do
      menu.items << menu_item
      put :update, :menu_id => menu.id, :id => menu_item.id, :selected_item => {:default => true}
      serialized_selected_items = ActiveModel::ArraySerializer.new(menu.reload.selected_items).as_json.first
      parsed_response = JSON.parse(response.body)
      parsed_response["selected_item"].symbolize_keys!
      parsed_response["selected_item"][:menu_item].symbolize_keys!
      expect(menu.reload.selected_items.first.default).to be true
      expect(parsed_response).to eq({"selected_item" =>serialized_selected_items})
    end
  end
  context "#destroy" do
    it "destroys the menu item if found" do
      menu.items << menu_item
      serialized_selected_items = ActiveModel::ArraySerializer.new(menu.reload.selected_items).as_json.first
      delete :destroy, :menu_id => menu.id, :id => menu_item.id
      parsed_response = JSON.parse(response.body)
      parsed_response["selected_item"].symbolize_keys!
      parsed_response["selected_item"][:menu_item].symbolize_keys!
      expect(menu.reload.items).to be_empty
      expect(parsed_response).to eq({"selected_item" =>serialized_selected_items})
    end
  end
end

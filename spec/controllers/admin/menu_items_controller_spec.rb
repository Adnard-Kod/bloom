require 'rails_helper'

describe Admin::MenuItemsController do
  let(:user) { FactoryGirl.create :user, :admin }
  before(:each) do
    stub_current_user controller, user
  end
  context "#index" do
    it "returns a json of all menu items" do
      get :index
      expect(JSON.parse(response.body)).to eq({"menu_items" => []})
    end
  end
  context "#create" do
    let(:valid_attributes) { FactoryGirl.attributes_for :menu_item }
    it "creates a menu item" do
      expect {
        post :create, :menu_item => valid_attributes
      }.to change { MenuItem.count }.by(1)
    end
    it "renders error if missing name" do
      expect {
        post :create, :menu_item => {name: ""}
      }.to_not change { MenuItem.count }
      expect(JSON.parse(response.body)).to eq("errors" => ["Name can't be blank", "Description can't be blank", "Category can't be blank"])
    end
  end
  context "#update" do
    let(:menu_item) { FactoryGirl.create :menu_item }
    it "updates menu item" do
      new_name = "update name"
      expect {
        put :update, id: menu_item.id, :menu_item => { name: new_name }
      }.to change { menu_item.reload.name }.from(menu_item.name).to(new_name)
    end
  end
  context "#destroy" do
    let!(:menu_item) { FactoryGirl.create :menu_item }
    it "destroys the menu item if found" do
      expect {
        delete :destroy, :id => menu_item.id
      }.to change{ MenuItem.count }.by(-1)
      expect { MenuItem.find(menu_item.id) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end

require 'rails_helper'
describe Admin::MenusController do
  let(:user) { FactoryGirl.create :user, :admin }
  before(:each) do
    stub_current_user controller, user
  end
  context "#index" do
    let(:menus_json) { ActiveModel::ArraySerializer.new(Menu.all)}
    it "returns a json of all menus" do
      get :index
      expect(JSON.parse(response.body)).to eq({"menus" => []})
    end
  end
  context "#create" do
    let(:valid_attributes) { FactoryGirl.attributes_for :menu }
    it "creates menu if params are valid" do
      expect {
        post :create, :menu => valid_attributes
      }.to change { Menu.count }.by(1)
      expect(JSON.parse(response.body)["menu"].keys).to eq(%w{id title current})
    end
    it "renders error if missing title" do
      expect {
        post :create, :menu => {title: ""}
      }.to_not change { Menu.count }
      expect(JSON.parse(response.body)).to eq("errors" => ["Title can't be blank"])
    end
  end
  context "#update" do
    let(:menu) { FactoryGirl.create :menu }
    it "updates menu if params are valid" do
      new_title = "updated menu"
      expect {
        put :update, :id => menu.id, :menu => { :title => new_title }
      }.to change { menu.reload.title }.from(menu.title).to(new_title)
      expect(JSON.parse(response.body)["menu"].keys).to eq(%w{ id title current})
    end
  end
  context "#destroy" do
    let!(:menu) { FactoryGirl.create :menu }
    it "destroys the menu if found" do
      expect {
        delete :destroy, :id => menu.id
      }.to change { Menu.count }.by(-1)
      expect { Menu.find(menu.id)}.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end

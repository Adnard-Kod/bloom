require 'rails_helper'
describe Admin::AddOnsController do
  let(:user) { FactoryGirl.create :user, :admin }
  before :each do
    stub_current_user controller, user
  end
  context "#index" do
    it "returns a json of all the add on items." do
      get :index
      expect(JSON.parse(response.body)).to eq({'add_ons' => []})
    end
  end
  context "#create" do
    let(:valid_attributes) { FactoryGirl.attributes_for :add_on}
    it "creates a add on" do
      expect{
        post :create, :add_on => valid_attributes
      }.to change { AddOn.count }.by(1)
    end
    it "renders error if params are invalid" do
      expect{
        post :create, :add_on => { price: "string" }
      }.to_not change { AddOn.count }
      expect(JSON.parse(response.body)).to eq("errors" => ["Name can't be blank", "Description can't be blank"])
    end
  end
  context "#update" do
    let(:add_on) { FactoryGirl.create :add_on }
    it "updates add on item" do
      new_name = "update name"
      expect{
        put :update, id: add_on.id, :add_on => { name: new_name }
      }.to change { add_on.reload.name }.from(add_on.name).to(new_name)
    end
  end
  context "#destroy" do
    let!(:add_on) { FactoryGirl.create :add_on }
    it "destroys the add on if found" do
      expect{
        delete :destroy, :id => add_on.id
      }.to change{ AddOn.count }.by(-1)
      expect { AddOn.find(add_on.id) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end

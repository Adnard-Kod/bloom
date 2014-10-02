require 'rails_helper'
describe Admin::UsersController do
  let(:user) { FactoryGirl.create :user, :admin }
  before :each do
    stub_current_user controller, user
  end
  context "#index" do
    it "will return a json of all users" do
      get :index
      expect(JSON.parse(response.body).count).to eq(1)
    end
  end
  context "#update" do
    it "updates a user admin state" do
      new_admin_status = false
      expect{
        put :update, id: user.id, user: { admin: new_admin_status }
      }.to change { user.reload.admin }.from(user.admin).to(new_admin_status)
    end
  end
  context "#destroy" do
    it "destroys the user if found" do
      expect{
        delete :destroy, id: user.id
      }.to change { User.count }.by(-1)
      expect { User.find(user.id)}.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end

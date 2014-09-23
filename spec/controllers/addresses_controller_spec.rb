require 'rails_helper'

describe AddressesController do
  let(:user) { FactoryGirl.create(:user) }
  let(:address) { FactoryGirl.create(:address, user: user) }
  let(:attributes) { FactoryGirl.attributes_for(:address) }

  before(:each) do
    stub_current_user controller, user
  end

  describe "POST #create" do
    it 'should increase the address count by 1 for a valid user' do
      expect {
        post :create, address: attributes, user_id: user.id
      }.to change{ Address.count }.by(1)
    end
  end

  describe "PUT #update" do
    it 'should update a field' do
      put :update, :id => address.id, :user_id => user.id, address: { street_address: '123 Baker Street' }
      expect(address.reload.street_address).to eq('123 Baker Street')
    end
  end
end

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

    it 'should create an address object with expected attributes' do
      post :create, address: attributes, user_id: user.id
      response_address = JSON.parse(response.body)
      response_address.each do |attr|
        expect(response_address[attr]).to eq(attributes[attr])
      end
    end

    it 'should return a http status 422 if a street address is not provided' do
      attributes[:street_address] = ''
      post :create, address: attributes, user_id: user.id
      expect(response).to have_http_status(422)
    end
  end

  describe "PUT #update" do
    it 'should update a field' do
      put :update, :id => address.id, :user_id => user.id, address: { street_address: '123 Baker Street' }
      expect(address.reload.street_address).to eq('123 Baker Street')
    end

    it 'should return a http status 422 if a city is not provided' do
      attributes[:city] = ''
      post :create, address: attributes, user_id: user.id
      expect(response).to have_http_status(422)
    end
  end

  describe "DELETE #destroy" do
    it 'should delete an address' do
      address
      expect {
        delete :destroy, id: address.id, user_id: user.id
      }.to change { Address.count }.by(-1)
    end
  end
end

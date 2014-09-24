require 'rails_helper'

describe AddressesController do
  let(:user) { FactoryGirl.create(:user) }
  let(:address) { FactoryGirl.create(:address, user: user) }
  let(:attributes) { FactoryGirl.attributes_for(:address) }

  before(:each) do
    stub_current_user controller, user
  end

  describe "POST #create" do
    it 'should increase the address count by 1 for current user' do
      expect {
        post :create, address: attributes, user_id: 'me'
      }.to change{ Address.count }.by(1)
    end

    it 'should increase the address count by 1 for an admin' do
      user[:admin] = true
      expect {
        post :create, address: attributes, user_id: user.id
      }.to change{ Address.count }.by(1)
    end

    it "redirects user to root path if user_id is not 'me'" do
      post :create, address: attributes, user_id: 1000
      expect(response).to redirect_to(root_path)
    end

    it 'should create an address object with expected attributes for current user' do
      post :create, address: attributes, user_id: 'me'
      response_address = JSON.parse(response.body)
      response_address.each do |attr|
        expect(response_address[attr]).to eq(attributes[attr])
      end
    end

    it 'should return a http status 422 if a street address is not provided' do
      attributes[:street_address] = ''
      post :create, address: attributes, user_id: 'me'
      expect(response).to have_http_status(422)
    end

    it 'should return the expected error messages if all required fields are blank' do
      post :create, address: {street_address: ''}, user_id: 'me'
      errors = ["Street address can't be blank", "City can't be blank", "State can't be blank", "Zipcode can't be blank"]
      errors.each_with_index do |error, index|
        expect(JSON.parse(response.body)['errors'][index]).to include(error)
      end
    end
  end

  describe "PUT #update" do
    it 'should update a field for current user' do
      put :update, :id => address.id, :user_id => 'me', address: { street_address: '123 Baker Street' }
      expect(address.reload.street_address).to eq('123 Baker Street')
    end

    it 'should update a field for an admin' do
      user[:admin] = true
      put :update, :id => address.id, :user_id => user.id, address: { street_address: '123 Baker Street' }
      expect(address.reload.street_address).to eq('123 Baker Street')
    end

    it 'should return a http status 422 if the city field is blank' do
      attributes[:city] = ''
      put :update, address: attributes, id: address.id, user_id: 'me'
      expect(response).to have_http_status(422)
    end

    it "redirects user to root path if user_id is not 'me'" do
      put :update, :id => address.id, :user_id => 1000, address: { street_address: '123 Baker Street' }
      expect(response).to redirect_to(root_path)
    end

    it 'should return the expected error messages if all required fields are blank during update' do
      put :update, id: address.id, address: {street_address: '', city: '', state: '', zipcode: ''}, user_id: 'me'
      errors = ["Street address can't be blank", "City can't be blank", "State can't be blank", "Zipcode can't be blank"]
      errors.each_with_index do |error, index|
        expect(JSON.parse(response.body)['errors'][index]).to include(error)
      end
    end
  end

  describe "DELETE #destroy" do
    it 'should delete an address for current user' do
      address
      expect {
        delete :destroy, id: address.id, user_id: 'me'
      }.to change { Address.count }.by(-1)
    end

    it 'should delete an address for an admin' do
      address
      user[:admin] = true
      expect {
        delete :destroy, id: address.id, user_id: user.id
      }.to change { Address.count }.by(-1)
    end

    it 'should return an error of "No address found with this id"' do
      address[:id] = 10000
      delete :destroy, id: address.id, user_id: 'me'
      expect(JSON.parse(response.body)['error']).to eq("No address found with this id")
    end

    it "redirects user to root path if user_id is not 'me'" do
      address
      delete :destroy, id: address.id, user_id: 1000
      expect(response).to redirect_to(root_path)
    end
  end

  describe "GET #show" do
    it 'returns an address for the user' do
      get :show, id: address.id, user_id: 'me'
      expect(response.body).to include(address.street_address)
    end

    it 'returns an address for an admin' do
      user[:admin] = true
      get :show, id: address.id, user_id: user.id
      expect(response.body).to include(address.street_address)
    end

    it "returns the error message 'An address doesn't exist for this user'" do
      get :show, id: 10000, user_id: 'me'
      expect(JSON.parse(response.body)['errors'][0]).to include("An address doesn't exist for this user")
    end

    it "redirects user to root path if user_id is not 'me'" do
      address
      get :show, id: address.id, user_id: 1000
      expect(response).to redirect_to(root_path)
    end
  end
end

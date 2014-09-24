require 'rails_helper'

describe AddressesController do
  let(:user) { FactoryGirl.create(:user) }
  let(:another_user) { FactoryGirl.create(:user) }
  let(:admin) { FactoryGirl.create(:user, :admin) }
  let!(:address) { FactoryGirl.create(:address, user_id: user.id) }
  let(:attributes) { FactoryGirl.attributes_for(:address) }

  before(:each) do
    stub_current_user controller, user
  end

  describe "POST #create" do
    it 'should increase the address count by 1 for current user' do
      expect {
        post :create, address: attributes, user_id: user.id
      }.to change{ user.reload.addresses.count }.by(1)

    end

    it 'should increase the address for the user if current_user is admin' do
      stub_current_user controller, admin
      post :create, address: attributes, user_id: user.id
      expect(response).to_not be_redirect
    end

    it "redirects user to root path if user_id is not same as the current_user" do
      post :create, address: attributes, user_id: another_user.id
      expect(response).to redirect_to(root_path)
    end

    it 'should create an address object with expected attributes for current user' do
      post :create, address: attributes, user_id: user.id
      response_address = JSON.parse(response.body)
      response_address.each do |attr|
        expect(response_address[attr]).to eq(attributes[attr])
      end
    end

    it 'should return a http status 422 if a street address is not provided' do
      attributes.delete :street_address
      post :create, address: attributes, user_id: user.id
      expect(response).to have_http_status(422)
    end

    it 'should return the expected error messages if all required fields are blank' do
      post :create, address: {street_address: ''}, user_id: user.id
      errors = ["Street address can't be blank", "City can't be blank", "State can't be blank", "Zipcode can't be blank"]
      errors.each_with_index do |error, index|
        expect(JSON.parse(response.body)['errors'][index]).to include(error)
      end
    end
  end

  describe "PUT #update" do
    let(:street_address) { '123 Baker Street' }
    it 'should update a field for current user' do
      put :update, :id => address.id, :user_id => user.id, address: { street_address: street_address }
      expect(address.reload.street_address).to eq(street_address)
    end

    it 'should update a field for an admin' do
      stub_current_user controller, admin
      put :update, :id => address.id, :user_id => user.id, address: { street_address: street_address }
      expect(address.reload.street_address).to eq(street_address)
    end

    it 'should return a http status 422 if the city field is blank' do
      attributes[:city] = ''
      put :update, address: attributes, id: address.id, user_id: user.id
      expect(response).to have_http_status(422)
    end

    it "redirects user to root path if user_id is not current_user" do
      put :update, :id => address.id, :user_id => another_user.id, address: { street_address: street_address }
      expect(response).to redirect_to(root_path)
    end

    it 'should return the expected error messages if all required fields are blank during update' do
      put :update, id: address.id, address: {street_address: '', city: '', state: '', zipcode: ''}, user_id: user.id
      errors = ["Street address can't be blank", "City can't be blank", "State can't be blank", "Zipcode can't be blank"]
      errors.each_with_index do |error, index|
        expect(JSON.parse(response.body)['errors'][index]).to include(error)
      end
    end
  end

  describe "DELETE #destroy" do
    it 'should delete an address for current user' do
      expect {
        delete :destroy, id: address.id, user_id: user.id
      }.to change { user.reload.addresses.count }.by(-1)
    end

    it 'should delete an address for an admin' do
      stub_current_user controller, admin
      expect {
        delete :destroy, id: address.id, user_id: user.id
      }.to change { user.reload.addresses.count }.by(-1)
    end

    it "redirects user to root path if user_id is not current_user" do
      delete :destroy, id: address.id, user_id: another_user.id
      expect(response).to redirect_to(root_path)
    end
  end

  describe "GET #index" do
    it 'returns an addresses for the user' do
      get :index, user_id: user.id
      expect(response.body).to include(address.street_address)
    end

    it "redirects user to root path if user_id is not current_user" do
      get :index, user_id: another_user.id
      expect(response).to redirect_to(root_path)
    end
  end
end

require 'rails_helper'
describe Address do
  let(:address) { FactoryGirl.create :address }
  context "validations" do
    [:street_address, :city, :state, :zipcode, :user_id].each do |attr|
      it { should validate_presence_of attr }
    end
  end
  it "#owner?" do
    address_user = address.user
    another_user = FactoryGirl.create :user
    expect(address.owner?(address_user)).to be true
    expect(address.owner?(another_user)).to be false
  end
  it "#full" do
    expect(address.full).to eq "#{address.street_address}, #{address.city}, #{address.state} #{address.zipcode}"
  end
end

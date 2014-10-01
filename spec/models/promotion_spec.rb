require 'rails_helper'
describe Promotion do
  let(:promotion) { FactoryGirl.build :promotion }
  context "validations" do
    it { should validate_presence_of :code }
    it { should validate_presence_of :description }
    it { should validate_presence_of :discount_type }
    it { should validate_presence_of :discount_amount }
    it { should validate_numericality_of :discount_amount }
  end
end

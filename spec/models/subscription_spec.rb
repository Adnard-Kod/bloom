require 'rails_helper'
describe Subscription do
  let(:subscription) { FactoryGirl.build :subscription }
  context "validations" do
    it { should validate_presence_of :name }
    it { should validate_presence_of :price }
    it { should validate_presence_of :weeks }
    it { should validate_presence_of :meals }
    it { should validate_numericality_of :price }
    it { should validate_numericality_of :weeks }
    it { should validate_numericality_of :meals }
  end
end

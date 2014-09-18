require 'rails_helper'
describe Menu do
  let(:menu) { FactoryGirl.build :menu }
  context "validations" do
    it { should validate_presence_of :title }
  end
end

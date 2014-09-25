require 'rails_helper'
describe Menu do
  let(:menu) { FactoryGirl.build :menu }
  context "validations" do
    it { should validate_presence_of :title }
    it { should have_many :selected_items }
    it { should have_many :items }
    it { should have_many :default_selected_items }
    it { should have_many(:default_items).through(:default_selected_items) }
  end
end

require 'rails_helper'
describe Menu do
  context "validations" do
    let(:menu) { FactoryGirl.build :menu }
    it { should validate_presence_of :title }
    it { should have_many :selected_items }
    it { should have_many :items }
    it { should have_many :default_selected_items }
    it { should have_many(:default_items).through(:default_selected_items) }
  end

  context "Current Menu" do
    let!(:menu) { FactoryGirl.create :menu, :current }
    it "Should return one current menu." do
      current_menu = Menu.current
      expect(current_menu).to eq(menu)
    end

    it "Should reassign the current menu." do
      menu = Menu.current
      current_menu = FactoryGirl.create :menu, :current
      expect( current_menu.current ).to eq(true)
    end

    it "Should change current attribute to false." do
      menu.decurrent!
      expect(menu.current).to eq(false)
    end
  end

  context "callbacks" do
    it "calls the default menu worker if current changed" do
      menu = FactoryGirl.create :menu
      expect(DefaultMenuWorker).to receive(:perform_async)
      menu.update_attributes :current => true
    end
    it "doesn't calls the default menu worker if current didn't change" do
      menu = FactoryGirl.create :menu
      expect(DefaultMenuWorker).to_not receive(:perform_async)
      menu.update_attributes :title => "something else"
    end
    it "doesn't calls the default menu worker if current didn't change" do
      menu = FactoryGirl.create :menu, :current
      expect(DefaultMenuWorker).to_not receive(:perform_async)
      menu.update_attributes :current => true
    end
  end
end

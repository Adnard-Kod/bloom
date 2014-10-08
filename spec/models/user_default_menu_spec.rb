require 'rails_helper'
describe UserDefaultMenu do
  let!(:user) { FactoryGirl.create :user }
  let!(:menu) {  FactoryGirl.create :menu, :current }
  let(:udm) { UserDefaultMenu.new menu, user }
  context "#menu" do
    it "returns the current menu" do
      expect(udm.menu).to eq menu
    end
  end
  context "#default_selected_items" do
    it "delegates to menu" do
      expect(udm.items).to eq user.default_selected_items
    end
  end
  context "#user" do
    it "returns the user" do
      expect(udm.user).to eq user
    end
  end
  context "#max_meals" do
    it "is equal  to user active subscription" do
      FactoryGirl.create :membership, :active, :user => user
      expect(udm.max_meals).to eq user.active_subscription.first.meals
    end
  end
  context "#update!" do
    context "6 meals subscription" do
      let(:subscription_meals) { 6 }
      before(:each) do
        subscription = FactoryGirl.create :subscription, :meals => subscription_meals
        FactoryGirl.create :membership, :active, :user => user, :subscription => subscription
        MenuSelectedItem::DEFAULT_COUNT.times {
          FactoryGirl.create :menu_selected_item, :default, :menu => menu
        }
      end
      it "returns the items based on subscription meals" do
        expect {
          udm.update!
        }.to change { udm.items.map(&:menu_item_id) }.from([]).to(menu.default_selected_items.map(&:menu_item_id))
      end
    end
    context "12 meals subscription" do
      let(:subscription_meals) { 12 }
      before(:each) do
        subscription = FactoryGirl.create :subscription, :meals => subscription_meals
        FactoryGirl.create :membership, :active, :user => user, :subscription => subscription
        (MenuSelectedItem::DEFAULT_COUNT/2).times {
          FactoryGirl.create :menu_selected_item, :default, :menu => menu, :menu_item => FactoryGirl.create(:menu_item, :category => "Entree")
        }
        (MenuSelectedItem::DEFAULT_COUNT/2).times {
          FactoryGirl.create :menu_selected_item, :default, :menu => menu, :menu_item => FactoryGirl.create(:menu_item, :category => "Side Dish")
        }
      end
      it "returns the items based on subscription meals" do
        udm.update!
        expect(udm.items.select(&:entree?).count).to eq subscription_meals/2
        expect(udm.items.select(&:side?).count).to eq subscription_meals/2
      end
    end
    context "16 meals subscription" do
      let(:subscription_meals) { 16 }
      before(:each) do
        subscription = FactoryGirl.create :subscription, :meals => subscription_meals
        FactoryGirl.create :membership, :active, :user => user, :subscription => subscription
        (MenuSelectedItem::DEFAULT_COUNT/2).times {
          FactoryGirl.create :menu_selected_item, :default, :menu => menu, :menu_item => FactoryGirl.create(:menu_item, :category => "Entree")
        }
        (MenuSelectedItem::DEFAULT_COUNT/2).times {
          FactoryGirl.create :menu_selected_item, :default, :menu => menu, :menu_item => FactoryGirl.create(:menu_item, :category => "Side Dish")
        }
      end
      it "returns the items based on subscription meals" do
        expect {
          udm.update!
        }.to change { udm.items.count }.from(0).to(subscription_meals)
      end
    end
    context "4 meals subscription" do
      let(:subscription_meals) { 4 }
      before(:each) do
        subscription = FactoryGirl.create :subscription, :meals => subscription_meals
        FactoryGirl.create :membership, :active, :user => user, :subscription => subscription
        (MenuSelectedItem::DEFAULT_COUNT/2).times {
          FactoryGirl.create :menu_selected_item, :default, :menu => menu, :menu_item => FactoryGirl.create(:menu_item, :category => "Entree")
        }
        (MenuSelectedItem::DEFAULT_COUNT/2).times {
          FactoryGirl.create :menu_selected_item, :default, :menu => menu, :menu_item => FactoryGirl.create(:menu_item, :category => "Side Dish")
        }
      end
      it "returns the items based on subscription meals" do
        udm.update!
        expect(udm.items.select(&:entree?).count).to eq subscription_meals/2
        expect(udm.items.select(&:side?).count).to eq subscription_meals/2
      end
    end
  end

end

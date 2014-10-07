require 'rails_helper'
describe MealLimit do
  let(:number_of_meals) { 6 }
  let(:meal_limit) { MealLimit.new number_of_meals }
  it "#meals" do
    expect(meal_limit.number_of_meals).to eq number_of_meals
  end
  it "#entrees" do
    expect(meal_limit.entrees).to eq number_of_meals/2
  end
  it "#sides" do
    expect(meal_limit.sides).to eq number_of_meals/2
  end
  context "#combos" do
    it "returns the possible combinations for 6" do
      combos = [
        {:entrees => 3, :sides => 3},
        {:entrees => 4, :sides => 1},
        {:entrees => 2, :sides => 5},
        {:entrees => 1, :sides => 7},
        {:entrees => 0, :sides => 9}
      ]
      expect(meal_limit.combos).to eq combos
    end
    it "returns the possible combinations for 12" do
      number_of_meals = 12
      meal_limit = MealLimit.new number_of_meals
      combos = [
        {:entrees => 6, :sides => 6},
        {:entrees => 7, :sides => 4},
        {:entrees => 8, :sides => 2},
        {:entrees => 9, :sides => 0},
        {:entrees => 5, :sides => 8},
        {:entrees => 4, :sides => 10},
        {:entrees => 3, :sides => 12},
        {:entrees => 2, :sides => 14},
        {:entrees => 1, :sides => 16},
        {:entrees => 0, :sides => 18}
      ]
      expect(meal_limit.combos).to eq combos
    end
  end
  it "RATIOS" do
    expect(MealLimit::RATIO).to eq 0.5
  end
end

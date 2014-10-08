class MealLimit
  RATIO = 0.5
  attr_reader :number_of_meals, :entrees, :sides

  def initialize number_of_meals
    @number_of_meals = number_of_meals
    @entrees = @number_of_meals/2
    @sides = @number_of_meals/2
  end

  def combos
    # combos = []
    # combos.push(entree_combos)
    # combos.push(side_combos)
    # combos.flatten.uniq
    [{:entrees => self.entrees, :sides => self.sides}]
  end

  private

  def entree_combos
    entrees_count = self.entrees
    sides_count = self.sides
    combos = []
    while(sides_count >= 0)
      combos.push :entrees => entrees_count, :sides => sides_count
      entrees_count = entrees_count + 1
      sides_count = sides_count - 2
    end
    combos
  end

  def side_combos
    entrees_count = self.entrees
    sides_count = self.sides
    combos = []
    while(entrees_count >= 0)
      combos.push :entrees => entrees_count, :sides => sides_count
      entrees_count = entrees_count - 1
      sides_count = sides_count + 2
    end
    combos
  end

end


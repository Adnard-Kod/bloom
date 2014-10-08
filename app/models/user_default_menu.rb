class UserDefaultMenu
  attr_reader :menu, :user
  delegate :default_selected_items, :to => :user
  def initialize menu, user
    @menu = menu
    @user = user
  end

  def max_meals
    self.user.reload.active_subscription.last.meals
  end

  def items
    self.user.reload.default_selected_items
  end

  def update!
    self.items.each(&:undefault!)
    items_to_save = []
    entree_items = default_menu_items.select(&:entree?)
    side_items = default_menu_items.select(&:side?)
    case default_menu_items.count <=> max_meals
    when 0
      items_to_save = inject_items(default_menu_items)
    when -1
      div, mod = max_meals.divmod(default_menu_items.count)
      div.times do
        items_to_save << inject_items(default_menu_items)
      end
      items_to_save << inject_items(entree_items.sample(mod/2))
      items_to_save << inject_items(side_items.sample(mod/2))
    when 1
      items_to_save << inject_items(entree_items.sample(max_meals/2))
      items_to_save << inject_items(side_items.sample(max_meals/2))
    end
    items_to_save.flatten.each &:save
  end

  private
  def default_menu_items
    self.menu.default_selected_items
  end
  def inject_items items
    items.inject([]) do |items_to_save, selected|
      items_to_save << self.user.selected_items.new(:menu_item_id => selected.menu_item_id, :default => true)
      items_to_save
    end
  end
end

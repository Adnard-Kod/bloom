class AddCurrentMenuToMenus < ActiveRecord::Migration
  def change
    add_column :menus, :current_menu, :boolean, default: false
  end
end

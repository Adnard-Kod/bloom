class RenameMenuItemsToItems < ActiveRecord::Migration
  def change
    rename_table :menu_items, :items
  end
end

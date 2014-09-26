class CreateSelectedItems < ActiveRecord::Migration
  def change
    create_table :selected_items do |t|
      t.belongs_to :menu
      t.belongs_to :menu_item
      t.boolean :default, :default => false
      t.timestamps
    end
  end
end

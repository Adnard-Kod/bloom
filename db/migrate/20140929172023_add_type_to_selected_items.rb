class AddTypeToSelectedItems < ActiveRecord::Migration
  def change
    add_column :selected_items, :type, :string
  end
end

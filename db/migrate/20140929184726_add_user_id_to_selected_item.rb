class AddUserIdToSelectedItem < ActiveRecord::Migration
  def change
    add_column :selected_items, :user_id, :integer
  end
end

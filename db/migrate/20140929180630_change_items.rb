class ChangeItems < ActiveRecord::Migration
  def change
    add_column :items, :price, :integer
    add_column :items, :type, :string
  end
end

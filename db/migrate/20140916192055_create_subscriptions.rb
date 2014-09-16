class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.string :name, :null => false
      t.text :description
      t.integer :price, :null => false
      t.integer :weeks, :null => false
      t.integer :meals, :null => false
    end
  end
end

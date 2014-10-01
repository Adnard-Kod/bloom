class CreatePromotions < ActiveRecord::Migration
  def change
    create_table :promotions do |t|
      t.string :code, :null => false
      t.string :description, :null => false
      t.string :discount_type, :null => false
      t.integer :discount_amount, :null => false
    end
  end
end

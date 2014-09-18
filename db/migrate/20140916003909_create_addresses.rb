class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :street_address, null: false
      t.string :apartment_number
      t.string :city, null: false
      t.string :state, null: false
      t.string :zipcode, null: false
      t.text :delivery_instructions
      t.float :longitude
      t.float :latitude
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end

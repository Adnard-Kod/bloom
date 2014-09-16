class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :street_address
      t.string :apartment_number
      t.string :city
      t.string :state
      t.string :zipcode
      t.float :longitude
      t.float :latitude
      t.integer :user_id
      t.timestamps
    end
  end
end

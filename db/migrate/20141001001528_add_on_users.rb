class AddOnUsers < ActiveRecord::Migration
  def change
    create_table :add_on_users do |t|
      t.belongs_to :user
      t.belongs_to :add_on
      t.timestamps
    end
  end
end

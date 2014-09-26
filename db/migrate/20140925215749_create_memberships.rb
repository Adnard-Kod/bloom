class CreateMemberships < ActiveRecord::Migration
  def change
    create_table :memberships do |t|
      t.integer :weeks_remaining
      t.integer :meals_remaining
      t.integer :meals_per_week
      t.date :start_date
      t.date :end_date
      t.string :status, default: 'active'
      t.integer :user_id
      t.integer :subscription_id
      t.timestamps
    end
  end
end

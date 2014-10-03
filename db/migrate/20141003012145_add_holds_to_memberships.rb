class AddHoldsToMemberships < ActiveRecord::Migration
  def change
    add_column :memberships, :hold_start, :date
    add_column :memberships, :hold_end, :date
    add_column :memberships, :hold_weeks_remaining, :integer
  end
end

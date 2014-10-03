class Admin::WeeklyOrdersController < AdminController
  def index
    serilaized_totals = ActiveModel::ArraySerializer.new(UserSelectedItem.total_orders
      ).as_json
    serilaized_user_summaries = ActiveModel::ArraySerializer.new(UserSelectedItem.
      reduce_to_user_and_menu_items).as_json
    render json: {:weekly_orders => serilaized_totals, :weekly_by_user => serilaized_user_summaries}
  end
end


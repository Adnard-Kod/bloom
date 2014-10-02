class Admin::WeeklyOrdersController < AdminController
  def index
    render json: UserSelectedItem.group_by_menu_item
  end
end


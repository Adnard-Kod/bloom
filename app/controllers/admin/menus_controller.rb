class Admin::MenusController < AdminController
  def index
    render json: Menu.all
  end

  def create
    menu = Menu.new(menu_params)
    if menu.save
      render json: menu
    else
      render json: {errors: menu.errors.full_messages}, status: :unprocessable_entity
    end
end

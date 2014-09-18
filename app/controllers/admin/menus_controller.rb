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

  def update
    menu = Menu.find(params[:id])
    if menu.update_attributes(menu_params)
      render json: menu
    else
      render json: {errors: menu.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    menu = Menu.find(params[:id])
    if menu.present?
      menu.destroy
      render json: {id: menu.id}
    else
      render json: {error: "No Menu found with this id"}
    end
  end

  private

  def menu_params
    params.require(:menu).permit(:title)
  end
end

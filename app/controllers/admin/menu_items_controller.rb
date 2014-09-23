class Admin::MenuItemsController < AdminController
  def index
    render json: Menu_Item.all
  end

  def create
    menu_item = Menu_Item.new(menu_item_params)
    if menu_item.save
      render json: menu_item
    else
      render json: {errors: menu_item.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update

  end

  def destroy

  end

  private

  def menu_item_params
    params.require(:menu_item).permit(:name, :description, :category)
  end
end

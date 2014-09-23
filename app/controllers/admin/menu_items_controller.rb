class Admin::MenuItemsController < AdminController
  def index
    render json: Menu_Item.all
  end

  def create
    menu_item = Menu_Item.new(menu_item_params)
    if menu_item.save
      render json: { menu_item: menu_item }
    else
      render json: {errors: menu_item.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    menu_item = Menu_Item.find(params[:id])
    if menu_item.update_attributes(menu_item_params)
      render json: { menu_item: menu_item }
    else
      render json: {errors: menu_item.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    menu_item = Menu_Item.find(params[:id])
    if menu_item.present?
      menu_item.destroy
      render json: {id: menu_item.id}
    else
      render json: {error: "No Menu item found with this id"}
    end
  end

  private

  def menu_item_params
    params.require(:menu_item).permit(:name, :description, :category)
  end
end

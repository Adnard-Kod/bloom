class Admin::MenuItemsController < AdminController
  def index
    render json: Menu_Item.all
  end

  def create

  end

  def update

  end

  def destroy

  end
end

class Admin::SelectedItemsController < AdminController
  before_filter :load_menu
  def index
    render :json => @menu.items
  end

  def create
    menu_item = MenuItem.find params[:menu_item_id]
    @menu.items << menu_item
    render :json => menu_item
  end

  def destroy
    menu_item = MenuItem.find params[:id]
    selected_item = SelectedItem.find_by_menu_id_and_menu_item_id @menu.id, menu_item.id
    selected_item.destroy
    render :json => menu_item
  end

  private
  def load_menu
    @menu = Menu.find params[:menu_id]
  end
end

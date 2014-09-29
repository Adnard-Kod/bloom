class Admin::SelectedItemsController < AdminController
  before_filter :load_menu
  def index
    render :json => @menu.selected_items
  end

  def create
    menu_item = MenuItem.find params[:menu_item_id]
    selected_item = MenuSelectedItem.new :menu => @menu, :menu_item => menu_item
    if selected_item.save
      render :json => selected_item
    else
      render :json => {:errors => selected_item.errors.full_messages}, :status => :unprocessable_entity
    end
  end

  def update
    menu_item = MenuItem.find params[:id]
    selected_item = MenuSelectedItem.find_by_menu_id_and_menu_item_id @menu.id, menu_item.id
    selected_item.update_attributes selected_item_params
    render :json => selected_item
  end

  def destroy
    menu_item = MenuItem.find params[:id]
    selected_item = MenuSelectedItem.find_by_menu_id_and_menu_item_id @menu.id, menu_item.id
    selected_item.destroy
    render :json => selected_item
  end

  private
  def load_menu
    @menu = Menu.find params[:menu_id]
  end
  def selected_item_params
    params.require(:selected_item).permit(:default)
  end
end

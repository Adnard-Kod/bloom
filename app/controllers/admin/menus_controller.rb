class Admin::MenusController < AdminController
  before_filter :load_menu, :only => [:update, :add_item, :destroy]

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
    if @menu.update_attributes(menu_params)
      render json: @menu
    else
      render json: {errors: @menu.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def add_item
    menu_item = MenuItem.find params[:item_id]
    @menu.items << menu_item
    render :json => {:success => true}
  end

  def destroy
    if @menu.present?
      @menu.destroy
      render json: {id: @menu.id}
    else
      render json: {error: "No Menu found with this id"}
    end
  end

  private

  def menu_params
    params.require(:menu).permit(:title)
  end

  def load_menu
    @menu = Menu.find(params[:id])
  end
end

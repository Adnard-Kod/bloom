class User::MenusController < UserController
  def index
    menu = Menu.current
    serialized_menu = MenuSerializer.new(menu).as_json
    selected_items = current_user.default_selected_items
    serialized_items = menu.default_selected_items if selected_items.blank?
    serialized_selected_items = ActiveModel::ArraySerializer.new(serialized_items)
    render :json => {:menu => serialized_menu["menu"], :selected_items => serialized_selected_items}
  end
end

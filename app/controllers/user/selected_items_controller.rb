class User::SelectedItemsController < UserController
  def create
    current_user.replace_selected_items! params[:selected_items]
    user_selected_items = current_user.reload.grouped_selected_items
    serialized_selected_items = ActiveModel::ArraySerializer.new(current_user.grouped_selected_items)
    render :json => {:selected_items => serialized_selected_items}
  end
end

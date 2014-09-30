class User::SelectedItemsController < UserController
  def create
    current_user.replace_selected_items! params[:selected_items]
    render :json => current_user.grouped_selected_items
  end
end

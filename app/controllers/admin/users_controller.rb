class Admin::UsersController < AdminController

  def index
    render json: User.order('admin desc')
  end

  def update
    render json: User.find(params[:id]).update_attributes(user_params)
  end

  def destroy
    render json: User.find(params[:id]).destroy
  end


  private

  def user_params
    params.require(:user).permit(:admin)
  end

end


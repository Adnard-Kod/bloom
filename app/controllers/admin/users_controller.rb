class Admin::UsersController < AdminController
  def index
    render json: User.order('email asc')
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    render json: user
  end

  def destroy
    user = User.find(params[:id]).destroy
    render json: {id: user.id}
  end

  private

  def user_params
    params.require(:user).permit(:admin)
  end

end


class Admin::UsersController < AdminController

  def index
    render json: User.order('admin desc')
  end

  def update
    user = User.find(params[:id])
    if user.update_attributes(user_params)
      render json: user
    else
      render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find(params[:id])
    if user.present?
      user.destroy
      render json: {id: user.id}
    else
      render json: {errors: "No User found with this id"}
    end
  end


  private

  def user_params
    params.require(:user).permit(:admin)
  end

end


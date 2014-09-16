class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      render json: { success: true }
    else
      render json: { success: false}
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :phone_number, :password, :password_confirmation)
  end
end

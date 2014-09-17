class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: { redirect: root_path }
    else
      render json: { success: false, :errors => user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :phone_number, :password, :password_confirmation)
  end
end

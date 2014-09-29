class UsersController < ApplicationController
  before_filter :load_and_authorize_user, only: [:show]

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      render json: { redirect: user_dashboard_index_path }
    else
      render json: { success: false, :errors => user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: @user
  end

  private
  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :phone_number, :password, :password_confirmation)
  end

  def load_and_authorize_user
    @user = User.find(params[:id])
    redirect_to root_path unless @user == current_user || current_user.admin?
  end
end

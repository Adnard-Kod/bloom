class SessionsController < ApplicationController
  def create
    user = User.find_by_email(params[:user][:email].downcase)
    if user && user.authenticate(params[:user][:password])
      session[:user_id] = user.id
      render json: { redirect: user_dashboard_index_path }
    else
      render json: { errors: ['Email and password combination are invalid.'] }, status: :unprocessable_entity
    end
  end

  def destroy
    logout
    redirect_to root_path
  end
end

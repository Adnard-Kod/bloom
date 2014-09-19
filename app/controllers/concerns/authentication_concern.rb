module AuthenticationConcern
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def user_logged_in?
    current_user.present?
  end

  def logout
    session.clear
  end

  def redirect_if_not_admin!
    redirect_to root_path unless user_logged_in? && current_user.admin?
  end

  def redirect_to_dashboards!
    redirect_to admin_dashboard_index_path if user_logged_in? && current_user.admin?
    redirect_to user_dashboard_index_path if user_logged_in? && !current_user.admin?
  end

  def authenticate_user!
    redirect_to root_path unless current_user.present?
  end
end

class UserController < ActionController::Base
  include AuthenticationConcern
  before_filter :authenticate_user!
  protect_from_forgery with: :exception
  helper_method :current_user
end

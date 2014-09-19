class AdminController < ActionController::Base
  include AuthenticationConcern
  before_filter :redirect_if_not_admin!
end

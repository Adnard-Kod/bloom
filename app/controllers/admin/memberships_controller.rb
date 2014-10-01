class Admin::MembershipsController < AdminController
  def index
    render json: Membership.active
  end
end

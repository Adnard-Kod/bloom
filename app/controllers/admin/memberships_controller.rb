class Admin::MembershipsController < AdminController
  def index
    memberships = ActiveModel::ArraySerializer.new(Membership.all).as_json
    grouped_memberships = memberships.group_by {|mem| mem[:status]}
    render json: grouped_memberships
  end
end

class User::DashboardController < UserController
  def index
    @serialized_user = UserSerializer.new(current_user).as_json["user"]
  end
end

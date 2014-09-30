class User::AddOnsController < UserController

  def active
    render json: AddOn.where(active: true)
  end

end

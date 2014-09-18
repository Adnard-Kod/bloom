class Admin::MenusController < AdminController
  def index
    render json: Menu.all
  end
end

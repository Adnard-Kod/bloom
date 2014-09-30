class Admin::AddOnsController < AdminController
  def index
    render json: AddOn.all
  end

  def create
    add_on = AddOn.new(add_on_params)
    if add_on.save
      render json: add_on
    else
      render json: {errors: add_on.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    add_on = AddOn.find(params[:id])
    if add_on.update_attributes(add_on_params)
      render json: add_on
    else
      render json: {errors: add_on.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    add_on = AddOn.find(params[:id])
    if add_on.present?
      add_on.destroy
      render json: {id: add_on.id}
    else
      render json: {errors: "No Add On found with this id"}
    end
  end

  private

  def add_on_params
    params.require(:add_on).permit(:name, :description, :price)
  end
end

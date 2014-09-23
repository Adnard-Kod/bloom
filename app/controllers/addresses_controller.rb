class AddressesController < UserController
  before_filter :load_user

  def create
    address = @user.addresses.new(address_params)
    if address.save
      render json: { address: address }
    else
      render json: {errors: address.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    address = Address.find(params[:id])
    address.update(address_params)
    if address.save
      render json: { address: address }
    else
      render json: { errors: address.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    address = Address.find params[:id]
    if address.nil?
      render json: { errors: ["An address doesn't exist for this user"]}, status: :unprocessable_entity
    else
      render json: { address: address}
    end
  end

  def destroy
    address = Address.find(params[:id])
    if address.present?
      address.destroy
      render json: { id: address.id }
    else
      render json: { error: "No address found with this id" }
    end
  end

  private
  def address_params
    params.require(:address).permit(:street_address, :apartment_number, :city, :state, :zipcode, :delivery_instructions)
  end
end

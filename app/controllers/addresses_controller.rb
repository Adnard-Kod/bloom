class AddressesController < UserController
  def create
    address = Address.new(address_params.merge(user_id: current_user.id))
    if address.save
      render json: { address: address }
    else
      render json: {errors: address.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    address = Address.find(params[:address][:id])
    address.update(address_params)
    if address.save
      render json: { address: address }
    else
      render json: { errors: address.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    address = Address.find_by_user_id(current_user.id)
    if address.nil?
      render json: { errors: ["An address doesn't exist for this user"]}, status: :unprocessable_entity
    else
      render json: { address: address}
    end
  end

  private
  def address_params
    params.require(:address).permit(:street_address, :apartment_number, :city, :state, :zipcode, :delivery_instructions)
  end
end

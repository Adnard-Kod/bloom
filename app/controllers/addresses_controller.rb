class AddressesController < UserController
  def create
    address = Address.new(address_params)
    if address.save
      render json: address
    else
      render json: {errors: address.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def address_params
    params.require(:address).permit(:street_address, :apartment_number, :city, :state, :zipcode, :delivery_instructions, :user_id)
  end
end

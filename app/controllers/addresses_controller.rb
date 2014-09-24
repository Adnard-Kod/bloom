class AddressesController < UserController
  before_filter :authorize_user, :load_user
  before_filter :load_address, :except => [:create]

  def create
    address = @user.addresses.new(address_params)
    if address.save
      render json: { address: address }
    else
      render json: {errors: address.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @address.update(address_params)
    if @address.save
      render json: { address: @address }
    else
      render json: { errors: @address.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    if @address.nil?
      render json: { errors: ["An address doesn't exist for this user"]}, status: :unprocessable_entity
    else
      render json: { address: @address}
    end
  end

  def destroy
    if @address.present?
      @address.destroy
      render json: { id: @address.id }
    else
      render json: { error: "No address found with this id" }
    end
  end

  private
  def address_params
    params.require(:address).permit(:street_address, :apartment_number, :city, :state, :zipcode, :delivery_instructions)
  end

  def authorize_user
    redirect_to root_path unless params[:user_id] == 'me' || current_user.admin?
  end

  def load_user
    @user = params[:user_id] == 'me' ? current_user : User.find(params[:user_id])
  end

  def load_address
    begin
      @address = Address.find(params[:id])
    rescue Exception => e
      @address = nil
    end
  end
end

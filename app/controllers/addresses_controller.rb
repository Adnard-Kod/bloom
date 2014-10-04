class AddressesController < UserController
  before_filter :load_and_authorize_user
  before_filter :load_and_authorize_address, except: [:create, :index]

  def index
    render :json => @user.addresses
  end

  def create
    address = current_user.addresses.new(address_params)
    if address.save
      render json: { address: address }
    else
      render json: {errors: address.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    @address.update(address_params)
    if @address.save
      render json: @address
    else
      render json: { errors: @address.errors.full_messages }, status: :unprocessable_entity
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

  def load_and_authorize_address
    @address = Address.find(params[:id])
    redirect_to root_path unless @address.owner?(@user) || current_user.admin?
  end

  def load_and_authorize_user
    @user = User.find params[:user_id]
    redirect_to root_path unless @user == current_user || current_user.admin?
  end
end

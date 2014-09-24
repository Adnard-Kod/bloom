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
      render json: { address: @address }
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

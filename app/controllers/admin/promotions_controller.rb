class Admin::PromotionsController < AdminController

  def create
    promotion = Promotion.new(promotion_params)
    if promotion.save
      render json: promotion
    else
      render json: {errors: promotion.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def update
    promotion = Promotion.find(params[:id])
    if promotion.update(promotion_params)
      render json: promotion
    else
      render json: {errors: promotion.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    promotion = Promotion.find(params[:id])
    if promotion.present?
      promotion.destroy
      render json: {id: promotion.id}
    else
      render json: {error: "No Promotion found with this id"}
    end
  end

  private
  def promotion_params
    params.require(:promotion).permit(:code, :description, :discount_type, :discount_amount)
  end


end
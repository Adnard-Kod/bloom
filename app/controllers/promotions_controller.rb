class PromotionsController < ApplicationController
  def index
    render json: Promotion.all
  end

  def validate_promotion_code
    promotion = Promotion.find_by_code(params[:promo_code])
    if promotion
      render json: promotion
    else
      render json: { error: "Promotion Code is Not Valid" }
    end
  end
end
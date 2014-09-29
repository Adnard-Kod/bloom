class StripeApi

  US_DOLLAR = 'usd'
  API_KEY = "sk_test_BQokikJOvBiI2HlWgH4olfQ2"
  attr_accessor :card, :token, :currency, :description, :payment_info, :receipt_email

  def initialize params, current_user
    set_api_key!
    @card = params[:token]
    @token = @card[:id]
    @currency = params[:currency] || US_DOLLAR
    @description = params[:payment_info][:subscription]
    @payment_info = params[:payment_info]
    @receipt_email = current_user[:email]
  end

  def charge!
    begin
      create_charge
    rescue Stripe::CardError => e
      render_error(e)
    end
  end

  private
  def set_api_key!
    Stripe.api_key = API_KEY
  end

  def create_charge
    Stripe::Charge.create(
      :amount => amount, # amount in cents, again
      :currency => currency,
      :card => token,
      :description => description,
      :receipt_email => receipt_email
    )
  end

  def render_error error
    p "STRIPE ERROR #{error}"
  end

  def amount
    payment_info[:amount].to_i
  end
end

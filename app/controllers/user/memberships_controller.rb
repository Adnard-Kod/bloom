class User::MembershipsController < UserController
  def create
    # Set your secret key: remember to change this to your live secret key in production
    # See your keys here https://dashboard.stripe.com/account
    Stripe.api_key = "sk_test_BQokikJOvBiI2HlWgH4olfQ2"

    # Get the stripe token generated from the submitted form
    token = params[:token][:id]
    # Create the charge on Stripe's servers - this will charge the user's card
    begin
      charge = Stripe::Charge.create(
        :amount => params[:payment_info][:amount].to_i, # amount in cents, again
        :currency => "usd",
        :card => token,
        :description => "payinguser@example.com"
      )
    rescue Stripe::CardError => e
      p "STRIPE ERROR #{e}"
    end

    render json: charge
  end
end

class User < ActiveRecord::Base
  has_secure_password
  validates :email, :first_name, :last_name, :phone_number, presence: true
  validates :email, uniqueness: true
  validates_confirmation_of :password
  has_many :addresses
  has_many :memberships
  has_many :subscriptions, :through => :memberships

  def subscribe_to_mailchimp testing=false
    return true if (Rails.env.test? && !testing)
    list_id = '37bebf807f'
    response = Rails.configuration.mailchimp.lists.subscribe({
      id: list_id,
      email: { email: email },
      double_optin: false,
      })
    response
  end

  after_create do
    subscribe_to_mailchimp
  end

end

class User < ActiveRecord::Base
  has_secure_password
  validates :email, :first_name, :last_name, :phone_number, presence: true
  validates :email, uniqueness: true
  validates_confirmation_of :password
  has_many :addresses
  has_many :memberships
  has_many :subscriptions, :through => :memberships
  after_create :subscribe_to_mailchimp
  after_save :subscribe_to_mailchimp
  before_destroy :unsubscribe_to_mailchimp

  def subscribe_to_mailchimp testing=false
    return true if (Rails.env.test? && !testing)
    list_id = ENV['MAILCHIMP_LIST_ID']
    response = Rails.configuration.mailchimp.lists.subscribe({
      id: list_id,
      email: { email: email },
      double_optin: false
      })
    response
  end

  def unsubscribe_to_mailchimp testing=false
    return true if (Rails.env.test? && !testing)
    list_id = ENV['MAILCHIMP_LIST_ID']
    response = Rails.configuration.mailchimp.lists.unsubscribe({
      id: list_id,
      email: { email: email },
      delete_member: true
      })
    response
  end

end

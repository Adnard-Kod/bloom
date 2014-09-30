class User < ActiveRecord::Base
  has_secure_password
  validates :email, :first_name, :last_name, :phone_number, presence: true
  validates :email, uniqueness: true
  validates_confirmation_of :password
  has_many :addresses
  has_many :memberships
  has_many :subscriptions, :through => :memberships
  has_many :selected_items, :class_name => 'UserSelectedItem'
  has_many :default_selected_items, ->{where(:default => true)}, :class_name => 'UserSelectedItem'
  after_create :subscribe_to_mailchimp
  after_save :subscribe_to_mailchimp
  before_destroy :unsubscribe_to_mailchimp
  delegate :subscribe_to_mailchimp, :unsubscribe_to_mailchimp, :to => :mailchimp

  def mailchimp
    @mailchimp ||= MailChimp.new self
  end
end

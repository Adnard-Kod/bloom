class User < ActiveRecord::Base
  has_secure_password
  validates :email, :first_name, :last_name, :phone_number, presence: true
  validates :email, uniqueness: true
  validates_confirmation_of :password
  has_many :addresses
  has_many :memberships
  has_many :subscriptions, :through => :memberships
  has_many :active_memberships, ->{ active? }, :class_name => 'Membership'
  has_many :active_subscription, :through => :active_memberships, :source => :subscription
  has_many :selected_items, :class_name => 'UserSelectedItem'
  has_many :default_selected_items, ->{where(:default => true)}, :class_name => 'UserSelectedItem'
  Membership::STATUSES.keys.each do |status|
    has_many :"#{status}_memberships", -> { send status }, :class_name => 'Membership'
  end
  after_create :subscribe_to_mailchimp
  after_save :subscribe_to_mailchimp
  before_destroy :unsubscribe_to_mailchimp
  delegate :subscribe_to_mailchimp, :unsubscribe_to_mailchimp, :to => :mailchimp
  has_many :add_on_users
  has_many :add_ons, through: :add_on_users

  def mailchimp
    @mailchimp ||= MailChimp.new self
  end

  def self.current_orders
    User.includes(:selected_items, :addresses, :memberships).all.map(&:grouped_selected_items).flatten
  end

  def self.serialized_current_orders
    ActiveModel::ArraySerializer.new(self.current_orders).as_json
  end

  def find_or_create_selected_items(default_selected_items)
    if self.selected_items.blank? && self.active_subscription.present?
      default_selected_items.each do |selected_item|
        self.selected_items.create :menu_item => selected_item.menu_item, :default => true
      end
    end
    self.grouped_selected_items
  end
  def grouped_selected_items
    sum = []
    self.selected_items.group_by(&:menu_item_id).each_value {|v| v.first.quantity = v.length; sum.push(v.first)}
    sum
  end
  def replace_selected_items! items
    self.default_selected_items.destroy_all
    items.each do |item_id, quantity|
      item = Item.find item_id
      quantity.to_i.times {
        self.selected_items.create :menu_item => item, :default => true
      }
    end
  end
  def full_name
    "#{self.first_name} #{self.last_name}"
  end
end

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
  Membership::STATUSES.keys.each do |status|
    has_many :"#{status}_memberships", -> { send status }, :class_name => 'Membership'
  end
  after_create :subscribe_to_mailchimp
  after_save :subscribe_to_mailchimp
  before_destroy :unsubscribe_to_mailchimp
  delegate :subscribe_to_mailchimp, :unsubscribe_to_mailchimp, :to => :mailchimp

  def mailchimp
    @mailchimp ||= MailChimp.new self
  end

  def find_or_create_selected_items(default_selected_items)
    if self.selected_items.blank?
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
end

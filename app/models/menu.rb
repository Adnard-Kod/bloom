class Menu < ActiveRecord::Base
  validates :title, presence: true
  has_many :selected_items, :class_name => 'MenuSelectedItem', :dependent => :destroy
  has_many :items, :through => :selected_items, :source => :menu_item
  has_many :default_selected_items, ->{where(:default => true)}, :class_name => 'SelectedItem'
  has_many :default_items, :through => :default_selected_items, :source => :menu_item
  has_many :menu_items
  before_update :deselect_default
  after_update :set_defaults_for_users

  def self.current
    self.find_by_current(true)
  end

  def deselect_default
    return unless self.current_changed?
    current_menu = Menu.current
    current_menu.decurrent! unless current_menu.blank? || current_menu == self
  end

  def decurrent!
    self.update_attribute(:current, false)
  end

  private
  def set_defaults_for_users
    DefaultMenuWorker.perform_async if self.current_changed? && self.current?
  end
end




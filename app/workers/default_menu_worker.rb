class DefaultMenuWorker
  include Sidekiq::Worker
  def perform
    User.includes(:default_selected_items).active.each do |user|
      puts "updating #{user.id}..."
      user_default_menu = UserDefaultMenu.new Menu.current, user
      user_default_menu.update!
    end
  end
end

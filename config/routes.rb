Rails.application.routes.draw do
  root 'home#index'
  namespace :admin do
    resources :dashboard, :only => [:index]
  end
  resources :subscriptions, :only => [:index]
end

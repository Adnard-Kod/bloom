Rails.application.routes.draw do
  root 'home#index'
  namespace :admin do
    resources :dashboard, :only => [:index]
    resources :subscriptions, :only => [:create, :update]
  end
  resources :subscriptions, :only => [:index]
end

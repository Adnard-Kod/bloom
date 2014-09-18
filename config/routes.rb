Rails.application.routes.draw do
  root 'home#index'
  namespace :admin do
    resources :dashboard, :only => [:index]
    resources :subscriptions, :only => [:create, :update, :destroy]
  end
  resources :subscriptions, :only => [:index]
  resources :users, except: [:new, :edit]
  resource :sessions, only: [:create, :destroy]

  namespace :user do
    resources :dashboard, only: [:index]
  end
end

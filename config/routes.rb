Rails.application.routes.draw do
  root 'home#index'

  namespace :admin do
    resources :menus, only: [:index, :create, :update, :destroy] do
      resources :selected_items, :only => [:index, :create, :update, :destroy]
    end
    resources :menu_items, only: [:index, :create, :update, :destroy]
    resources :add_ons, only: [:index, :create, :update, :destroy]
    resources :users, only: [:index, :update, :destroy]
    resources :dashboard, :only => [:index]
    resources :memberships, :only => [:index]
    resources :subscriptions, :only => [:create, :update, :destroy]
    resources :promotions, :only => [:create, :update, :destroy]
  end

  resources :subscriptions, :only => [:index]
  resources :promotions, :only => [:index]
  get '/promotions/validate_promotion_code', to: 'promotions#validate_promotion_code'
  resources :users, except: [:new, :edit] do
    resources :addresses, :except => [:show, :edit, :new]
  end
  resource :sessions, only: [:create, :destroy]

  namespace :user do
    resources :subscriptions, :only => [:index]
    resources :add_ons, :only => [:create]
    get '/add_ons/active', to:'add_ons#active'
    resources :memberships, :only => [:index, :create]
    resources :menus, :only => [:index]
    resources :dashboard, :only => [:index]
    resources :selected_items, :only => [:create]
    resources :dashboard, :only => [:index] do
      collection do
        get 'my_account'
      end
    end
  end
end

Rails.application.routes.draw do
  root 'home#index'

  namespace :admin do
    resources :menus, only: [:index, :create, :update, :destroy] do
      resources :selected_items, :only => [:index, :create, :update, :destroy]
    end
    resources :menu_items, only: [:index, :create, :update, :destroy]
    resources :add_ons, only: [:index, :create, :update, :destroy]
    resources :dashboard, :only => [:index]
    resources :subscriptions, :only => [:create, :update, :destroy]
  end

  resources :subscriptions, :only => [:index]
  resources :users, except: [:new, :edit] do
    resources :addresses, :except => [:show, :edit, :new]
  end
  resource :sessions, only: [:create, :destroy]

  namespace :user do
    resources :subscriptions, :only => [:index]
    resources :memberships, :only => [:create]
    resources :menus, :only => [:index]
    resources :dashboard, :only => [:index]
  end
end
